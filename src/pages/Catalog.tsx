import React from 'react';
import Card from '../components/Card';

const Catalog = (): JSX.Element => {
  return (
   <div className='flex flex-wrap justify-center gap-x-20 gap-y-8'>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
   </div>
  );
};

export default Catalog;
