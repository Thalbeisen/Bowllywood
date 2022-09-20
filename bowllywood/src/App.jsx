import logo from './logo.svg';
import './App.scss';
import './sass/style.scss';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
// import Button from './components/Button';
// Normalement on le fait dans le dossier des services
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import Input from './components/Input';

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
        <Input
        name="Test"
        desc="Test input description"
        type="0"
        value="test"
        />
       <SearchBar /> 
      <Header logo={logo} />
      {/* <Button /> */}
      {/* {posts.map(post => <h2 key={post.id}>{post.title}</h2>)} */}
    </div>
  );
}

export default App;