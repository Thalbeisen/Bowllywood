import './../sass/styles.scss'

const Button = ({type='primary'}) => {

    return (
        <>
            <button class={`btn btn-${type} text-black`}>Bouton classique</button>            
        </>
    );
}

export default Button;