import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Col, Row, Container } from 'react-bootstrap';
import './RegisterScreen.scss';

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
                    <Container className="pb-5">
                        <Row className="flex-center">
                            <Col lg="3">
                                <img
                                    src="Bowllywood.png"
                                    alt="Logo du restaurant de bowls nommé Bowllywood"
                                />
                            </Col>
                            <Col lg="6">
                                <p className='logoText'>
                                    T'inscrire sur notre site te permettra de gérer
                                    ton espace fidélité et d'avoir une traçabilité
                                    de tes réservations
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <form noValidate onSubmit={handleSubmit} className="container">
                                    <Row className="justify-content-evenly">
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
                                                type="text"
                                                name="firstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                                desc="Tape ton prénom"
                                                placeholder="Jean"
                                                error={
                                                    errors.firstName && touched.firstName && errors.firstName
                                                }
                                            />
                                        </Col>
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
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
                                    <Row className="justify-content-evenly">
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
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
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
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
                                    <Row className="justify-content-evenly mb-4">
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                desc="Choisis un mot de passe"
                                                placeholder="********"
                                                error={
                                                    errors.password && touched.password && errors.password
                                                }
                                            />
                                        </Col>
                                        <Col lg="4" className="d-flex justify-content-center px-4">
                                            <Input
                                                type="password"
                                                name="passwordConfirm"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                desc="Confirme ton mot de passe"
                                                placeholder="********"
                                                error={
                                                    errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Button type="submit">S'enregistrer</Button>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>
        </Container>
    );
}

export default RegisterScreen;
