import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from '../components/Input';
import '../sass/styles.scss';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Une adresse mail est requise pour se connecter!')
        .email("Ce n'est pas une adresse mail valide!"),
    password: yup
        .string()
        .required('Un mot de passe est obligatoire pour se connecter!')
        .min(6, 'Le mot de passe est trop court'),
});

function LoginScreen() {
    return (
        <Formik
            validationSchema={loginSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                alert(JSON.stringify(values));
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <div className="container-fluid">
                    <div className="loginLogoContainer">
                        <img
                            src="Bowllywood.png"
                            alt="Logo du restaurant de bowls nommé Bowllywood"
                            className='loginLogo'
                        />
                        <p className='loginText'>
                            Te connecter sur notre site te permettra de gérer
                            ton espace fidélité et d’avoir une traçabilité de
                            tes réservations
                        </p>
                    </div>
                    <div className="loginForm">
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="inputContainer">
                                <InputText
                                    error={
                                        errors.email &&
                                        touched.email &&
                                        errors.email
                                    }
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    desc="Veuillez entrer votre adresse mail"
                                    className="form-control"
                                    id="email"
                                />
                                <InputText
                                    error={
                                        errors.password &&
                                        touched.password &&
                                        errors.password
                                    }
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    desc="Entrez votre mot de passe"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="loginButton">
                                Connexion
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default LoginScreen;
