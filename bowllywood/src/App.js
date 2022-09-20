import logo from './logo.svg';
import './App.scss';
import './style.scss';
import Header from './components/Header';
<<<<<<< HEAD
// import Button from './components/Button';
=======
import Button from './components/Button';
import SearchBar from './components/SearchBar';
>>>>>>> 37379a561ca45c888bb7d187945fe59ed9b12d47
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
      type="text"
      value="email@email.fr"
      />
      <SearchBar />
      <Header logo={logo} />
      {/* <Button /> */}
      {/* {posts.map(post => <h2 key={post.id}>{post.title}</h2>)} */}
    </div>
  );
}

export default App;
