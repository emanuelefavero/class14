import { useState } from 'react';

export const StudentAvatar = ({ student }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (!student.avatar_path || imageFailed) {
    return (
      <span className='catalog-avatar' aria-hidden='true'>
        {student.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      className='catalog-avatar'
      src={student.avatar_path}
      alt=''
      loading='lazy'
      onError={() => setImageFailed(true)}
    />
  );
};
