import React from 'react';

const Group = ({ label, children }) => {
  return (
    <div className="flex w-full mb-[24px]">
      <div className='relative grow w-fit pt-3'>
        <p className='absolute top-0 left-3 z-100 bg-bg-light-dark px-2'>{label}</p>
        <div className='w-full h-fit border border-border-100 rounded-md z-0 p-4 overflow-x-hidden'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Group;
