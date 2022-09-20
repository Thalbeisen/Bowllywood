import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
// Normalement on le fait dans le dossier des services
import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonSecondary from './components/ButtonSecondary';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      setPosts(res.data);
      console.log(res.data);
    })
  }, [])
  return (
    <div className="App">
      <ButtonSecondary />
      {/* <SearchBar /> */}
      {/* <Header logo={logo} /> */}
      {/* <Button /> */}
      {/* {posts.map(post => <h2 key={post.id}>{post.title}</h2>)} */}
    </div>
  );
}

export default App;
