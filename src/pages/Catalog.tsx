import React from 'react';
import Card from '../components/Card';
import { catalog } from '../catalogData';

const Catalog = (): JSX.Element => {
  return (
   <div className='flex flex-wrap justify-center gap-x-20 gap-y-8'>
       {catalog.map(animation =>
           <Card key={animation.id} {...animation} />
       )}
   </div>
  );
};

export default Catalog;
