import logo from './logo.svg';

import './App.scss';
import './sass/style.scss';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
// Normalement on le fait dans le dossier des services
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import Input from './components/Input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import ProductCard from './components/Card';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';  
function App() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
  //     setPosts(res.data);
  //     console.log(res.data);
  //   })
  // }, [])
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
