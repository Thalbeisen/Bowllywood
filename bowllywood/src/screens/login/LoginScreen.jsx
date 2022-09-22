import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/Input';
import { Col, Row, Container } from 'react-bootstrap';
import '../../sass/styles.scss';

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
                <Container>
                    <Row>
                    <Col>
                        <img
                            src="Bowllywood.png"
                            alt="Logo du restaurant de bowls nommé Bowllywood"
                        />
                        </Col>
                        <Col>
                        <p className='loginText'>
                            Te connecter sur notre site te permettra de gérer
                            ton espace fidélité et d’avoir une traçabilité de
                            tes réservations
                        </p>
                        </Col>
                        </Row>
                        <form noValidate onSubmit={handleSubmit}>
                            <Row className="loginContainer">
                                <Col className="d-flex justify-content-center">
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
                                    placeholder="jbon@herta.fr"
                                    desc="Email"
                                    id="email"
                                />
                                </Col>
                                <Col className="d-flex justify-content-center">
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
                                    desc="Mot de passe"
                                />
                                </Col>
                            </Row>
                            <button type="submit" className="loginButton">
                                Connexion
                            </button>
                        </form>
                    </Container>
            )}
        </Formik>
    );
}

export default LoginScreen;
