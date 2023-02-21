import React from 'react';
import Card from '../components/Card';
import { catalog } from '../catalogData';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {
  onChangeAnimation: () => void
}

const Catalog = ({ onChangeAnimation }: Props): JSX.Element => {
  return (
      <>
          <Header />
          <div className='flex flex-wrap justify-center gap-x-20 gap-y-8'>
              {catalog.map(animation =>
                  <Card key={animation.id}
                        {...{
                          ...animation,
                          animation: () => {
                            onChangeAnimation();
                            animation.animation();
                          }
                        }} />
              )}
          </div>
          <Footer />
      </>
  );
};

export default Catalog;
