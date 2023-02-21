import React from 'react';
import './ArrowIcon.css';

interface Props {
  onClick: () => void
}

export const RightArrowIcon = ({ onClick }: Props): JSX.Element => {
  return (
    <a className="fixed top-1/2 right-0 mr-10 arrow animate-pulse"
       onClick={onClick}
    ></a>
  );
};

export const BottomArrowIcon = ({ onClick }: Props): JSX.Element => {
  return (
      <a className="fixed left-1/2 -translate-x-1/2 bottom-0 mb-10 arrow animate-pulse rotate-90"
      onClick={onClick}></a>
  );
};
