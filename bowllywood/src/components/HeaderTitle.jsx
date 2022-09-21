import logo from '../../src/assets/img/logos/bowllywood.png';
import {useState} from 'react';

const Header = () => {

  // dynamic title
  const [title, setTitle] = useState('Titre h2');
  const defineTitle = () => {
    setTitle();
  }

  return (
    <header className="d-flex flex-column align-items-center justify-content-center">
      <img src={logo} className="App-logo" alt="logo" />
      <h2 className="m-0">{title}</h2>
  </header>
  );
}

export default Header;