import { spawn } from 'node:child_process';
import { access, mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../assets/projects.js';
import { students } from '../assets/students.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'assets');
const avatarDirectory = path.join(assets, 'avatars');
const statusPath = path.join(assets, 'github-sync-status.json');
const avatarsPath = path.join(assets, 'student-avatars.json');
const matchesPath = path.join(assets, 'student-projects.json');
const refresh = process.argv.includes('--refresh');
const concurrency = 4;

const readJson = async (file, fallback) => {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
};

const saveJson = async (file, value) => {
  const temporary = `${file}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`);
  await rename(temporary, file);
};

const curl = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn('curl', args);
    let output = '';
    let errors = '';

    child.stdout.on('data', (chunk) => (output += chunk));
    child.stderr.on('data', (chunk) => (errors += chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(output.trim());
      else reject(new Error(errors.trim() || `curl exited with ${code}`));
    });
  });

const request = async (url, destination, head = false) => {
  const output = await curl([
    '-L',
    '--silent',
    '--show-error',
    '--max-time',
    '25',
    '--retry',
    '2',
    '--retry-delay',
    '2',
    '--user-agent',
    'Class14 asset sync',
    ...(head ? ['--head'] : []),
    '--output',
    destination,
    '--write-out',
    '%{http_code}\n%{url_effective}\n%{content_type}',
    url,
  ]);
  const [code, finalUrl, contentType] = output.split('\n');
  return { code: Number(code), finalUrl, contentType };
};

const imageExtension = (contentType) => {
  if (contentType?.startsWith('image/jpeg')) return 'jpg';
  if (contentType?.startsWith('image/png')) return 'png';
  if (contentType?.startsWith('image/webp')) return 'webp';
  return null;
};

const work = async (items, action) => {
  for (let start = 0; start < items.length; start += concurrency) {
    await Promise.all(items.slice(start, start + concurrency).map(action));
  }
};

const unique = (items) => new Set(items.map((item) => item.toLowerCase())).size === items.length;

if (!unique(students.map(({ github }) => github))) throw new Error('Duplicate GitHub usernames');
if (!unique(projects.map(({ name }) => name))) throw new Error('Duplicate project names');

await mkdir(avatarDirectory, { recursive: true });
const status = await readJson(statusPath, { profiles: {}, repositories: {} });
status.profiles ??= {};
status.repositories ??= {};

for (const student of students) {
  const { github } = student;
  const previous = status.profiles[github];
  if (!refresh && previous && previous.status !== 'error') {
    if (previous.status === 'missing') continue;
    try {
      await access(path.join(assets, previous.avatar));
      continue;
    } catch {
      // Download the avatar again if its cached file was removed.
    }
  }

  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'class14-avatar-'));
  const responseFile = path.join(temporaryDirectory, 'response');

  try {
    const response = await request(`https://api.github.com/users/${encodeURIComponent(github)}`, responseFile);
    if (response.code === 404) {
      status.profiles[github] = { status: 'missing' };
    } else if (response.code !== 200) {
      throw new Error(`Profile returned HTTP ${response.code}`);
    } else {
      const profile = JSON.parse(await readFile(responseFile, 'utf8'));
      if (profile.login?.toLowerCase() !== github.toLowerCase()) {
        throw new Error('GitHub returned a different account');
      }

      const avatarUrl = new URL(profile.avatar_url);
      avatarUrl.searchParams.set('s', '256');
      const avatar = await request(avatarUrl.href, responseFile);
      const extension = imageExtension(avatar.contentType);
      if (avatar.code !== 200 || !extension) {
        throw new Error(`Avatar returned HTTP ${avatar.code} (${avatar.contentType})`);
      }

      const filename = `${github}.${extension}`;
      await rename(responseFile, path.join(avatarDirectory, filename));
      status.profiles[github] = {
        status: 'found',
        avatar: `avatars/${filename}`,
        profileUrl: profile.html_url,
      };
    }
  } catch (error) {
    status.profiles[github] = { status: 'error', message: error.message };
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
    await saveJson(statusPath, status);
    console.log(`${github}: ${status.profiles[github].status}`);
  }
}

const candidates = students.flatMap(({ github }) =>
  projects.map(({ name }) => ({ github, name, key: `${github}/${name}` })),
);
const pending = candidates.filter(({ key }) => refresh || !['found', 'missing'].includes(status.repositories[key]?.status));
console.log('Repository verification: public exact GitHub URLs');

for (let start = 0; start < pending.length; start += concurrency) {
  const batch = pending.slice(start, start + concurrency);
  await work(batch, async ({ github, name, key }) => {
    const url = `https://github.com/${encodeURIComponent(github)}/${encodeURIComponent(name)}`;
    try {
      const response = await request(url, '/dev/null', true);
      if (response.code === 200) {
        const finalPath = new URL(response.finalUrl).pathname.toLowerCase();
        status.repositories[key] = finalPath === `/${github}/${name}`.toLowerCase()
          ? { status: 'found', repoUrl: response.finalUrl }
          : { status: 'missing', redirectedTo: response.finalUrl };
      } else if (response.code === 404) {
        status.repositories[key] = { status: 'missing' };
      } else {
        throw new Error(`Repository returned HTTP ${response.code}`);
      }
    } catch (error) {
      status.repositories[key] = { status: 'error', message: error.message };
    }
  });
  await saveJson(statusPath, status);
  console.log(`Checked ${Math.min(start + concurrency, pending.length)}/${pending.length} repository URLs`);
}

const avatars = students.flatMap(({ github }) => {
  const profile = status.profiles[github];
  return profile?.status === 'found' ? [{ github, path: profile.avatar }] : [];
});
const matches = candidates.flatMap(({ github, name, key }) => {
  const repository = status.repositories[key];
  return repository?.status === 'found'
    ? [{ github, project: name, repoUrl: repository.repoUrl }]
    : [];
});

await saveJson(avatarsPath, avatars);
await saveJson(matchesPath, matches);

const profileErrors = students.filter(({ github }) => status.profiles[github]?.status === 'error').length;
const repositoryErrors = candidates.filter(({ key }) => status.repositories[key]?.status === 'error').length;
console.log(`Profiles: ${avatars.length}/${students.length} avatars; repository matches: ${matches.length}/${candidates.length}; errors: ${profileErrors} profiles, ${repositoryErrors} URLs`);
if (profileErrors || repositoryErrors) process.exitCode = 1;
