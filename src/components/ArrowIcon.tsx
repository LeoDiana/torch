import React from 'react';
import './ArrowIcon.css';

export const RightArrowIcon = (): JSX.Element => {
  return (
    <a href="#" className="fixed top-1/2 right-0 mr-10 arrow animate-pulse"></a>
  );
};

interface Props {
  onClick: () => void
}

export const BottomArrowIcon = ({ onClick }: Props): JSX.Element => {
  return (
      <a href="#" className="fixed left-1/2 -translate-x-1/2 bottom-0 mb-10 arrow animate-pulse rotate-90"
      onClick={onClick}></a>
  );
};
