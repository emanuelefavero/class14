# Code Style Guidelines

Lean procedural conventions for JavaScript and TypeScript projects, including
Node.js, Express, and React.

## Priorities

1. Prefer the simplest correct implementation.
2. Keep control flow and failure paths visible.
3. Give each function and module one clear responsibility.
4. Add abstractions only for a current, concrete need.
5. Optimize for readability, testability, and easy removal or replacement.

## General rules

- Use `const` by default, `let` for intentional reassignment, and never `var`.
- Prefer named arrow functions and focused modules.
- Handle invalid, missing, and exceptional cases first with guard clauses.
- Avoid `else` after a branch that returns.
- Keep decisions in ordinary control flow; avoid hiding branches in callbacks,
  configuration, or fluent APIs.
- Use `map`, `filter`, `find`, `some`, and `reduce` when they clearly describe a
  collection operation.
- Extract shared code only when it represents a stable responsibility or gives
  an important operation a useful name.
- Accept small repetitions when the alternative adds indirection.
- Prefer composition of functions and modules over inheritance.
- Prefer plain serializable objects for data and keep behavior in functions.
- Keep state local, deliberate, and owned by one layer.
- Avoid classes, `this`, constructors, factories, containers, providers, and
  strategy layers unless an external API or real lifecycle requires them.

```js
const item = repository.findById(id);

if (!item) return response.status(404).json({ message: 'Item not found' });

return response.json(item);
```

## Modules and dependencies

- Use ESM and include `.js` in relative imports.
- Export named members where they are declared.
- Prefer direct imports for stable local dependencies.
- Use namespace imports when the module is a meaningful namespace:

```js
import * as repository from './repository.js';
```

- Use an `index.js` barrel only to create a clearer public module boundary.
- Use lowercase module names and namespace aliases where conventions permit.
- Pass ordinary operation-specific values as arguments.
- Use dependency injection only for real interchangeable implementations,
  lifecycle configuration, or meaningful side-effect isolation.
- Do not add a layer that only forwards calls to another layer.

### `init` factories

Use `init` only when a module establishes private state or a resource lifecycle,
such as a database connection, configured client, subscription, or stateful ID
generator. Export stateless functions directly.

```js
export const init = (client) => ({
  findAll: () => client.query('SELECT * FROM items'),
});
```

Alias generic initializers at the import site, such as
`import { init as initDatabase } from './database.js'`.

## Data, validation, and errors

- Validate untrusted data once at its boundary: requests, forms, environment,
  files, and external services.
- Normalize at the same boundary when transformation is part of its contract.
- Use direct guards for small checks and schemas for coercion, nested data, or
  useful structured errors.
- Do not repeatedly validate trusted internal values.
- Use `null` or `undefined` for simple expected absence.
- Return explicit failure values when callers must distinguish expected cases.
- Do not throw for validation or not-found flow.
- Catch and translate errors at meaningful I/O or framework boundaries.

## Node.js and Express

- For resource-oriented apps, colocate routes, controllers, repositories, and
  schemas for each resource.
- Routes map endpoints to controllers.
- Controllers validate HTTP input, call application logic, and translate results
  into HTTP responses.
- Repositories access persistence and must not depend on Express or choose HTTP
  status codes.
- Add a service layer only when it owns application rules or coordinates several
  operations.
- Register routes directly for small apps; use `express.Router()` when mounting,
  nesting, reuse, or router-level middleware provides a concrete benefit.
- Prefer a descriptive side-effect name such as `registerUsers` over generic
  `init` for route registration.
- Use middleware for genuinely repeated cross-cutting behavior such as auth,
  validation, logging, or centralized error handling.

## React

- Use function components and hooks.
- Keep state at the narrowest owning component; derive rather than duplicate it.
- Pass ordinary values and callbacks through props.
- Use early returns for loading, errors, empty states, and access restrictions.
- Extract components for real UI responsibilities and hooks for already-reused
  stateful behavior.
- Add context, reducers, providers, or global state only for demonstrated needs.
- Keep effects narrow and limited to synchronization with external systems.
- Keep event handlers imperative and visible.

## TypeScript-specific guidelines

- Apply all preceding rules.
- Prefer `type` over `interface`; prefer literal unions over enums.
- Let TypeScript infer local variables and function return types.
- Annotate inputs and external boundaries when inference has no source.
- Treat external values as `unknown` and narrow them with guards or decoders.
- Avoid `as` as a substitute for validation; use `satisfies` when checking a
  contract without discarding a value's inferred type.
- Use explicit predicate return types for type guards.
- Keep checking separate from decoding when coercion or normalization occurs.
- Brand primitives only for important validated guarantees.
- Model alternatives and expected failures with discriminated unions.
- Handle unions with normal guards, not `unwrap`, `match`, or fluent chains.
- Isolate throwing or `this`-dependent APIs behind small boundaries that expose
  ordinary functions and explicit failures.
- Avoid speculative generics, recursive conditional types, and type frameworks.

```ts
type Result<T, E> = { tag: 'success'; value: T } | { tag: 'failure'; error: E };
```

## Review checklist

- Is the normal flow readable from top to bottom?
- Are exceptional cases handled early?
- Does every abstraction solve a current problem?
- Is state kept at the narrowest useful scope?
- Are untrusted values validated at the correct boundary?
- Does `init`, DI, middleware, or an extra layer have a concrete responsibility?
- Could a named function, direct import, or small repetition be clearer?
