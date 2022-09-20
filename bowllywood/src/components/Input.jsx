const InputText = (props) => {
    return (
        <div className="inputCtnr">
            <label htmlFor={props.name}>{props.desc}</label>
            <input  type={props.type} 
                    // value={props.value} 
                    name={props.name}
                    placeholder={props.desc}
                    className="inputStyle" />
        </div>
    )
}

export default InputText;