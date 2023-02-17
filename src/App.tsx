import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Catalog from './pages/Catalog';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Catalog />
      <Footer />
    </>
  );
};

export default App;
