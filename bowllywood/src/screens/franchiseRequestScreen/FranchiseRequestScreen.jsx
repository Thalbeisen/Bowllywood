import { useFormik } from 'formik';
import * as yup from 'yup';
import { addFranchiseRequest } from '../../services/franchiseRequest';
import HeaderTitle from './../../components/HeaderTitle';
import InputText from './../../components/Input';
import Button from '../../components/Button';
import { Col, Row, Container } from 'react-bootstrap';
import './../../sass/styles.scss';

const validationSchema = yup.object({
    phone: yup.string().required('Ce champ est obligatoire'),
    city: yup.string().required('Ce champ est obligatoire'),
    estimatedAmount: yup.number().required('Ce champ est obligatoire'),
    hopedFinancing: yup.number().required('Ce champ est obligatoire'),
    shopLocation: yup.string().required('Ce champ est obligatoire'),
    foodServiceExperience: yup.number().required('Ce champ est obligatoire'),
    conditionOfUse: yup.bool().oneOf([true], 'Veuillez accepter les CGU').required(),
    user_id: yup.string(),
});

const FranchiseRequestScreen = () => {
    const onSubmit = (values) => {
        console.log(values);
        addFranchiseRequest(values)
            .then(() => {
                alert('Demande de franchise ajoutée');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const {values, errors, handleSubmit, handleChange, handleBlur, touched} =
        useFormik({
            initialValues: {
                phone: '',
                city: '',
                estimatedAmount: '',
                hopedFinancing: '',
                shopLocation: '',
                foodServiceExperience: '',
                conditionOfUse: false,
                status: 'PENDING',
                // DELETE LINE BELOW ONCE LOGIN FEATURE READY
                user_id: '6324d81ea70c53011eaf4733',
            },
            validationSchema,
            onSubmit,
        });

    return (
        <>
            <Container>
                <Row className="flex-center">
                    <Col>
                        <img
                            src="Bowllywood.png"
                            alt="Logo du restaurant de bowls nommé Bowllywood"
                        />
                    </Col>
                </Row>
                {/* <HeaderTitle/>     */}
                <Row>
                    <Col>
                        <form onSubmit={handleSubmit}>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="phone"
                                    desc="Numéro de téléphone *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    placeholder="Ex: 0612345678"
                                    error={
                                        errors.phone &&
                                        touched.phone &&
                                        errors.phone
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="city"
                                    desc="Ville *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    placeholder="Ex: Paris"
                                    error={
                                        errors.city && touched.city && errors.city
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="estimatedAmount"
                                    desc="Montant estimé de l'investissement *"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.estimatedAmount}
                                    placeholder="Ex: 400000"
                                    error={
                                        errors.estimatedAmount &&
                                        touched.estimatedAmount &&
                                        errors.estimatedAmount
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="hopedFinancing"
                                    desc="Financement envisagé *"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.hopedFinancing}
                                    placeholder="Ex: 200000"
                                    error={
                                        errors.hopedFinancing &&
                                        touched.hopedFinancing &&
                                        errors.hopedFinancing
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="shopLocation"
                                    desc="Ville d'implantation *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.shopLocation}
                                    placeholder="Ex: Lyon"
                                    error={
                                        errors.shopLocation &&
                                        touched.shopLocation &&
                                        errors.shopLocation
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="foodServiceExperience"
                                    desc="Expérience dans la restauration *"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.foodServiceExperience}
                                    placeholder="Ex: 3"
                                    error={
                                        errors.foodServiceExperience &&
                                        touched.foodServiceExperience &&
                                        errors.foodServiceExperience
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-6 col-md-4 d-flex justify-content-center">
                                <InputText
                                    name="conditionOfUse"
                                    desc="J'ai lu et j'accepte les conditions générales d'utilisation *"
                                    type="checkbox"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.conditionOfUse}
                                    error={
                                        errors.conditionOfUse &&
                                        touched.conditionOfUse &&
                                        errors.conditionOfUse
                                    }
                                />
                            </Col>
                            <Col className='col-6 col-md-4 d-flex justify-content-center'>
                                <Button type="submit">Envoyer ma demande</Button>
                            </Col>
                            <Col className="col-6 col-md-4 d-flex justify-content-center d-none">
                                <InputText
                                    name="status"
                                    desc=""
                                    type="hidden"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.status}
                                    error={
                                        errors.status &&
                                        touched.status &&
                                        errors.status
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 d-flex justify-content-center mb-5 d-none">
                                <InputText
                                    name="user_id"
                                    desc=""
                                    type="hidden"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_id}
                                    error={
                                        errors.user_id &&
                                        touched.user_id &&
                                        errors.user_id
                                    }
                                />
                            </Col>
                        </Row>
                        {/* <Col className='mb-5'>
                            <Button type="submit">Envoyer ma demande</Button>
                        </Col> */}

                        </form>
                    </Col>
                </Row>
                
            </Container>
        </>
    );
};

export default FranchiseRequestScreen;
