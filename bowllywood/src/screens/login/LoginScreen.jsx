import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/Input';
import MessageToast from '../../components/Toast';
import Button from '../../components/Button';
import { Col, Row, Container } from 'react-bootstrap';
import './LoginScreen.scss';
import AuthContext from '../../providers/AuthProvider';
import { loginUser } from '../../service/user';
import axios from 'axios';

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
    const [loginSuccess, setLoginSuccess] = useState(false);

    return (
        <>
            {loginSuccess ? (
                <h1>Connexion OK</h1>
            ) : (
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values) => {
                        //alert(JSON.stringify(values));
                       await loginUser(values).then(
                        <MessageToast
                        variant='Success'
                        messageType='Notification'
                        messageSource='Connexion'
                        />
                       ).catch(err => {
                        console.log(err)
                       });
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
                        <Container className="pb-5">
                            <Row className="flex-center mb-5">
                                <Col lg="3">
                                    <img
                                        src="Bowllywood.png"
                                        alt="Logo du restaurant de bowls nommé Bowllywood"
                                    />
                                </Col>
                                <Col lg="6">
                                    <p className="loginText">
                                        Te connecter sur notre site te permettra
                                        de gérer ton espace fidélité et d’avoir
                                        une traçabilité de tes réservations
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <form
                                        noValidate
                                        onSubmit={handleSubmit}
                                        className="container"
                                    >
                                        <Row className="justify-content-center gap-4 mb-5">
                                            <Col
                                                lg="4"
                                                className="d-flex justify-content-center px-4"
                                            >
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
                                            <Col
                                                lg="4"
                                                className="d-flex justify-content-center px-4"
                                            >
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
                                                    placeholder="********"
                                                />
                                            </Col>
                                        </Row>
                                        <Button type="submit">Connexion</Button>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Formik>
            )}
        </>
    );
}

export default LoginScreen;
