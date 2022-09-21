import logo from './logo.svg';
import './App.scss';
import './sass/style.scss';
// Normalement on le fait dans le dossier des services
import axios from 'axios';
// import
import { useEffect, useState } from 'react';
import Header from './components/Header';
import MenuScreen from './screens/MenuScreen';

function App() {
  return (
    <div className="App">
      <Header logo={logo}/>
      <MenuScreen />
    </div>
  );
}

export default App;
