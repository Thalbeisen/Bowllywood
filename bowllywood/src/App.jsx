import logo from './logo.svg';

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
function App() {
  return (
    <div className="App">
      {/* <Header logo={logo}/> */}
      <RegisterScreen />
      {/* <Button type='primary'  /> */}
      {/* <Button type='secondary' /> */}
        {/* <Input
        name="Test"
        desc="Test input description"
        type="0"
        value="test"
        /> */}
      {/* <SearchBar /> */}
      {/* <Header logo={logo} /> */}
      {/* {posts.map(post => <h2 key={post.id}>{post.title}</h2>)} */}
      {/* <ProductCard /> */}
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
