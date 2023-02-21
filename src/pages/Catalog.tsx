import React from 'react';
import Card from '../components/Card';
import { catalog } from '../catalogData';

interface Props {
  onChangeAnimation: () => void
  setCurrentAnimation: (animation: () => void) => void
}

const Catalog = ({ onChangeAnimation, setCurrentAnimation }: Props): JSX.Element => {
  return (
        <div className='flex flex-wrap justify-center gap-x-20 gap-y-8'>
            {catalog.map(animation =>
                <Card key={animation.id}
                      {...{
                        ...animation,
                        animation: () => {
                          onChangeAnimation();
                          setCurrentAnimation(() => animation.animation);
                          animation.animation();
                        }
                      }} />
            )}
        </div>
  );
};

export default Catalog;
