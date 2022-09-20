import { useState } from 'react';
import './Button.scss';

const Button =  () => {
    const [counter, setCounter] = useState(0);
    const handleClick = () => {
        setCounter(c => c + 1);
    }
    return ( 
    <div className='btn-container'>
        <button onClick={handleClick}>Cliqué { counter }</button>
    </div> 
    );
}

export default Button;