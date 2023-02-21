import React, { useState } from 'react';
import './App.css';
import Catalog from './pages/Catalog';
import { BottomArrowIcon } from './components/ArrowIcon';
import { clear, turnOffCustomCursor } from './graphics';

const App = (): JSX.Element => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);

  return (
    <>
        {isCatalogOpen
          ? <Catalog onChangeAnimation={() => { setIsCatalogOpen(false); }} />
          : <BottomArrowIcon onClick={() => {
            setIsCatalogOpen(true);
            turnOffCustomCursor();
            clear();
          }}/>}
    </>
  );
};

export default App;
