import React from 'react';
import Logo from '../img/animation_logo.gif';

const Header = (): JSX.Element => {
  return (
    <div className='flex items-center p-2'>
        <img src={Logo} className='h-14 w-20' alt='logo' />
        <p className='font-extrabold'>Catalog</p>
    </div>
  );
};

export default Header;
