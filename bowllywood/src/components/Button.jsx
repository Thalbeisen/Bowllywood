import './../sass/styles.scss'

const Button = ({type='primary'}) => {

    return (
        <>
            <button class={`btn btn-${type} text-black`}>Bouton</button>            
        </>
    );
}

export default Button;