import React from 'react';
import './Card.css';
import animationFlower from '../img/animation_circle.jpeg';

interface Props {
  title: string
  description: string
  animation: () => void
}

const Card = ({ title, description, animation }: Props): JSX.Element => {
  return (
    <div className="flex font-sans w-116 bg-white rounded-2xl main mt-4 overflow-hidden h-56">

        <div className="flex-none w-60 relative">
            <img src={animationFlower} alt="smthing" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-auto p-6">
            <div className="flex flex-wrap">
                <p className="flex-auto text-4xl font-semibold  text-slate-900">
                    {title}
                </p>
                <div className="w-full flex-none text-sm font-normal text-slate-700 mt-2 italic">
                    {description}
                </div>
                <button className="h-9 mt-4 w-full px-6 font-semibold rounded-md bg-[#1E1E1E] text-white button"
                        onClick={animation}>
                    Light
                </button>
            </div>
        </div>
    </div>
  );
};
export default Card;
