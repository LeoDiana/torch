import React from 'react';
import Logo from '../img/animation_logo.gif';

interface Props {
  onClick: () => void
}

const Header = ({ onClick }: Props): JSX.Element => {
  return (
    <div className='flex items-center p-2'>
        <img src={Logo} className='h-14 w-20' alt='logo' onClick={onClick}/>
        <p className='font-extrabold animate-pulse' onClick={onClick}>Catalog</p>
    </div>
  );
};

export default Header;
