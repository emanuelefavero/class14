import { useState } from 'react';

export const StudentAvatar = ({ student, size = 'row' }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const className = `catalog-avatar catalog-avatar--${size}`;

  if (!student.avatar_path || imageFailed) {
    return (
      <span className={className} aria-hidden='true'>
        {student.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={student.avatar_path}
      alt=''
      loading='lazy'
      onError={() => setImageFailed(true)}
    />
  );
};
