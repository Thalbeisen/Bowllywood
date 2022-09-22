import "./Form.scss";
import { useState } from "react";

const CustomForm = (props) => {
    const [formInputs, setFormInputs] = useState({});

    return (
        <div className="container-fluid">
            <form className="bb row flex-column align-items-center">
                {/* {props.input} */}
            </form>
        </div>
    )
}

export default CustomForm;