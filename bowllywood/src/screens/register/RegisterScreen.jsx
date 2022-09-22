import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/Input';
import { Col, Row, Container } from 'react-bootstrap';
import '../../sass/styles.scss';

function RegisterScreen() {
    return (
        <Container>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    password: '',
                    passwordConfirm: '',
                }}
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
                            <p className='logoText'>
                                T'inscrire sur notre site te permettra de gérer
                                ton espace fidélité et d'avoir une traçabilité
                                de tes réservations
                            </p>
                        </Col>
                        </Row>
                        <form noValidate onSubmit={handleSubmit}>
                            <Row className="registerContainer">
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        desc="Tapes ton prénom"
                                        placeholder="Jean"
                                        error={
                                            errors.firstName && touched.firstName && errors.firstName
                                        }
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        desc="Et ton nom de famille"
                                        placeholder="Bon"
                                        error={
                                            errors.lastName && touched.lastName && errors.lastName
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="date"
                                        name="birthday"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        desc="Quand es-tu né?"
                                        error={
                                            errors.birthDate && touched.birthDate && errors.birthDate
                                        }
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        desc="Donnes-nous ton adresse mail?"
                                        placeholder="jbon@herta.fr"
                                        error={
                                            errors.email && touched.email && errors.email
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        desc="Choisis un mot de passe"
                                        error={
                                            errors.password && touched.password && errors.password
                                        }
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <InputText
                                        type="password"
                                        name="passwordConfirm"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        desc="Confirme ton mot de passe"
                                        error={
                                            errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm
                                        }
                                    />
                                </Col>
                            </Row>
                            <button type="submit" className="registerButton">
                                Enregistrer
                            </button>
                        </form>
                    </Container>
                )}
            </Formik>
        </Container>
    );
}

export default RegisterScreen;
