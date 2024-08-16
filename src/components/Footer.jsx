import React from 'react';

const Footer = ({ ...props }) => {
  return (
    <footer className={props.className}>
      <div className='footer flex justify-center items-center w-full h-28 m-auto'>
        <p>&copy; 2022 Your Company</p>
      </div>
    </footer>
  );
}

export default Footer;