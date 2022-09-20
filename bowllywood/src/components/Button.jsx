import { useState } from 'react';
import './Button.scss';
import '../sass/style.scss';

const Button =  () => {
    const [counter, setCounter] = useState(0);
    const handleClick = () => {
        setCounter(c => c + 1);
    }
    return ( 
    <div className=''>
        <button className='btn bg-primary' onClick={handleClick}>Clique { counter }</button>
    </div> 
    );
}

export default Button;