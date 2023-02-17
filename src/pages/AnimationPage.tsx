import React from 'react';
import { BottomArrowIcon } from '../components/ArrowIcon';
import './AnimationPage.css';

const AnimationPage = (): JSX.Element => {
  return (
        <div className='flex flex-wrap justify-center'>
            <div className='w-96 h-96 rounded-2xl opacity-50 audio-player p-4 overflow-hidden text-white'>
              <h1>Song one</h1>
              <p>artist</p>
            </div>
            <BottomArrowIcon />
        </div>
  );
};

export default AnimationPage;
