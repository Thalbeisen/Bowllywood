import logo from './logo.svg';

import './App.scss';
import './sass/style.scss';
<<<<<<< HEAD
=======
import Header from './components/Header';
import SearchBar from './components/SearchBar';
>>>>>>> a47af698625576b9f4da52d1c50dbc268c11e35c
// Normalement on le fait dans le dossier des services
import axios from 'axios';
// import
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import Header from './components/Header';
import MenuScreen from './screens/MenuScreen';

=======
import Button from './components/Button';
import ProductCard from './components/Card';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';  
>>>>>>> a47af698625576b9f4da52d1c50dbc268c11e35c
function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Header logo={logo}/>
      <MenuScreen />
=======
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
      <Navbar />
>>>>>>> a47af698625576b9f4da52d1c50dbc268c11e35c
    </div>
  );
}

export default App;
