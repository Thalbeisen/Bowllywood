import CustomForm from './CustomForm.jsx';

const InputText = ( props ) => {
    return (
    <div className="inputCtnr col-6 px-0 my-5">
        <label htmlFor={props.name} className="w-100">{props.desc}</label>
        <input  type={props.type} 
                // value={props.value} 
                name={props.name}
                placeholder={props.desc}
                // onChange={handleInputChange}
                className="no-border w-100 py-2 ps-3" />
    </div>
    )
}

export default InputText;