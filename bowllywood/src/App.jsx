import logo from './logo.svg';

import './App.scss';
import './sass/styles.scss';
// Normalement on le fait dans le dossier des services
import axios from 'axios';

// import
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import MenuScreen from './screens/menu';
import MealScreen from './screens/meal';

function App() {
  return (
    <div className="App">
      <MealScreen />
    </div>
  );
}

export default App;
