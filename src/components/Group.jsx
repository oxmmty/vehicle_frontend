import React from 'react';

const Group = ({ label, children }) => {
  return (
    <div className='relative pt-3'>
      <p className='absolute top-0 left-3 z-100 bg-base-100 px-2'>{label}</p>
      <div className='w-fit h-fit border border-border-100 rounded-md z-0 p-4 overflow-x-hidden'>
        {children}
      </div>
    </div>
  );
};

export default Group;
