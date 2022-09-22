import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import './sass/style.scss';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
// Normalement on le fait dans le dossier des services
import axios from 'axios';
// import
import { useEffect, useState } from 'react';
import MenuScreen from './screens/MenuScreen';
import Button from './components/Button';
import ProductCard from './components/Card';
//import Navbar from './components/Navbar';
import RegisterScreen from './screens/RegisterScreen';
import 'bootstrap/dist/js/bootstrap.bundle.min';  
import Template from './components/Template';

function App() {
    return (
        <div className="App">
            <Router>
                    <Routes>
                      <Route path="/" element={<Template/>}>
                        {/* COMPLETER COMME L'EXEMPLE CI-DESSOUS */}
                        {/* <Route path="/test" element={<Test/>}/> */}
                        <Route path="/reservation" />
                        <Route path="/menu" />
                        <Route path="/mark" />
                        <Route path="/register" />
                        <Route path="/login" />
                        </Route>
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
