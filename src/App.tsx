import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { BottomArrowIcon, RightArrowIcon } from './components/ArrowIcon';
import { clear, turnOffCustomCursor } from './graphics';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import AnimationPage from './pages/AnimationPage';
import Footer from './components/Footer';
import { catalog } from './catalogData';

type OpenedPage = 'catalog' | 'animationPage' | 'animation';
type ActionType = 'openCatalog' | 'openAnimationPage' | 'openAnimation';

interface Action {
  type: ActionType
};

const reducer = (state: OpenedPage, action: Action): OpenedPage => {
  switch (action.type) {
    case 'openCatalog':
      return 'catalog';
    case 'openAnimationPage':
      return 'animationPage';
    case 'openAnimation':
      return 'animation';
    default:
      throw new Error();
  }
};

export const openCatalog = (): Action => {
  return { type: 'openCatalog' };
};

export const openAnimation = (): Action => {
  return { type: 'openAnimation' };
};

export const openAnimationPage = (): Action => {
  return { type: 'openAnimationPage' };
};

const animationOnStart = catalog[2].animation;
const initialAnimationState = () => () => animationOnStart;

const App = (): JSX.Element => {
  const [isJustStarted, setIsJustStarted] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState<() => void>(initialAnimationState);
  const [openedPage, dispatch] = useReducer(reducer, 'animation');

  useEffect(() => {
    animationOnStart();
  }, []);

  if (openedPage === 'animation') {
    return isJustStarted
      ? (<RightArrowIcon onClick={() => {
          setIsJustStarted(false);
          dispatch(openCatalog());
          clear();
        }
        }/>)
      : (<BottomArrowIcon onClick={() => {
          dispatch(openAnimationPage());
          turnOffCustomCursor();
          clear();
        }}/>);
  }

  return (
    <>
      <Header onClick={() => {
        dispatch(openCatalog());
      }}/>
      {openedPage === 'catalog' &&
          <Catalog
              setCurrentAnimation={setCurrentAnimation}
              onChangeAnimation={() => {
                dispatch(openAnimation());
                clear();
              }}/>}
      {openedPage === 'animationPage' &&
          <AnimationPage openAnimation={() => {
            dispatch(openAnimation());
            currentAnimation();
          }}/>}
      <Footer/>
  </>
  );
};

export default App;
