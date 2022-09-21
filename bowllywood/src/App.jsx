import logo from './logo.svg';

import './App.scss';
import './sass/style.scss';
// Normalement on le fait dans le dossier des services
import axios from 'axios';

// import
import { useEffect, useState } from 'react';
import HeaderTitle from './components/HeaderTitle';
import MenuScreen from './screens/MenuScreen';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div className="App">
      <HeaderTitle />
      <MenuScreen />
    </div>
  );
}

export default App;
