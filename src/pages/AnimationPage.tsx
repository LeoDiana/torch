import React, { useState } from 'react';
import './AnimationPage.css';
import Next from '../img/next.png';
import Previous from '../img/previous.png';

interface Props {
  openAnimation: () => void
}

const AnimationPage = ({ openAnimation }: Props): JSX.Element => {
  const [isPaused, setPaused] = useState(true);
  return (
    <div className='w-full flex justify-evenly h-auto mt-8'>
      <div className='w-125 h-125 pl-4 pr-4'>
        <p className='text-5xl uppercase font-medium mb-4'>
          Animation
        </p>
        <p className='font-light text-base leading-7 mb-5'>
          Take a deep breath and close your eyes while you listen to specific music. Imagine the animation you saw, try to detail all the lines. Here we`ve used simple math to bring together vibrant geometry and consistent transformations.
        <br /><br />
        The patterns may be accompanied by a soundtrack that complements the visual display, creating a fully immersive experience for the viewer. The colors and patterns may change rapidly, creating a sense of movement and transformation that can be both captivating and unsettling. It might be designed to provoke thought and reflection on themes related to perception, consciousness, or the nature of reality. The animation itself might be a series of rapidly flashing or flickering geometric shapes, lines, and colors that create a mesmerizing and disorienting effect.
        </p>
        <button className='w-64 h-10 hover:bg-white hover:text-black font-semibold rounded-lg bg-black text-white border-2 border-white duration-300'
        onClick={openAnimation}>Back to animation</button>
      </div>

      <audio src='' id='audio'></audio>
        <div className='flex flex-wrap justify-center'>
            <div className='w-96 h-125 rounded-2xl audio-player p-4 overflow-hidden text-white'>
              <h1 className='text-3xl font-bold mb-2 text-center mt-4'>Three White Horses</h1>
              <p className='text-base mb-8 text-center'>Andrew Bird</p>

              <div className={`block w-44 h-44 rounded-full disk ${isPaused ? '' : 'play'} bg-cover animate-spin-slow before:absolute before:rounded-full before:bg-black before:h-8 before:w-8`}></div>

              <div className='song-slider w-full relative'>
                <input type='range' min='1' max='193' defaultValue='38' step='1' className='seek-bar w-full h-2 rounded-lg cursor-pointer overflow-hidden' />
                <span className='current-time'>00:38</span>
                <span className='song-duration absolute right-0'>3:13</span>
              </div>

              <div className='w-[55%] flex justify-between items-center m-auto mt-5'>
                <button className='w-10 h-10 bg-black rounded-full cursor-pointer flex justify-center items-center previous'>
                  <img src={Previous} alt='previous'></img>
                </button>

                <button className={`relative w-16 h-16 rounded-full bg-black cursor-pointer play-btn ${isPaused ? 'pause' : ''} animate-pulse`} onClick={() => { setPaused((isPaused) => !isPaused); }}>
                  <span className='absolute top-1/2 left-[27%] translate-y-[-50%] w-2.5 h-7 bg-white duration-500 rounded-sm'></span>
                  <span className='absolute top-1/2 left-[57%] translate-y-[-50%] w-2.5 h-7 bg-white duration-500 rounded-sm origin-center'></span>
                </button>

                <button className='w-10 h-10 bg-black rounded-full cursor-pointer flex justify-center items-center next'>
                  <img src={Next} alt='next' ></img>
                </button>
              </div>
            </div>
        </div>
    </div>
  );
};

export default AnimationPage;
