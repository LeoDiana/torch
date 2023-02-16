import React from 'react';
import './Card.css';

const Card = (): JSX.Element => {
  return (
    <div className="flex font-sans w-96 bg-white rounded-2xl ">

        <div className="flex-none w-48 relative">
            <img src='/logo512.png' alt="smthing" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <form className="flex-auto p-6">
            <div className="flex flex-wrap">
                <h1 className="flex-auto text-4xl font-semibold  text-slate-900">
                Title
                </h1>
                <div className="w-full flex-none text-sm font-normal text-slate-700 mt-2 italic">
                Smth like description or anth else, just text for being interested in this animation. What else can I write ?
                </div>
                <button className="h-9 mt-4 w-full px-6 font-semibold rounded-md bg-[#1E1E1E] text-white button" type="submit">
                Light
                </button>
            </div>
        </form>
    </div>
  );
};
export default Card;
