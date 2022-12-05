import { useFormik } from 'formik';
import * as yup from 'yup';

import { editFranchiseRequest, getFranchiseRequestDetail } from '../../services/franchiseRequest';
import HeaderTitle from '../../components/HeaderTitle';
import InputText from '../../components/Input';
import Button from '../../components/Button';

import { Col, Row, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, redirect  } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import './../../sass/styles.scss';

// const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
// const token =   authHeaders['token'];
// const decoded = jwt_decode(token);
// const userID = decoded.id

const validationSchema = yup.object({
    phone: yup.string().required('Ce champ est obligatoire'),
    city: yup.string().required('Ce champ est obligatoire'),
    estimatedAmount: yup.number().required('Ce champ est obligatoire'),
    hopedFinancing: yup.number().required('Ce champ est obligatoire'),
    shopLocation: yup.string().required('Ce champ est obligatoire'),
    foodServiceExperience: yup.number().required('Ce champ est obligatoire'),
    conditionOfUse: yup
        .bool()
        .oneOf([true], 'Veuillez accepter les CGU')
        .required(),
});

const EditFranchiseRequestScreen = () => {
    const authContext = useContext(AuthContext);
    const userID = authContext.auth.userID;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState(
        {
            phone: '',
            city: '',
            estimatedAmount: '',
            hopedFinancing: '',
            shopLocation: '',
            foodServiceExperience: '',
            conditionOfUse: true,
            status: 'PENDING',
        }
    );

    let { id } = useParams();
console.log(id);
    useEffect(() => {
        getFranchiseRequestDetail(id)
            .then((res) => {
                setInitialValues(res.data);
                // console.log(res.data);
                // console.log(res.data.user_id);
                // console.log(userID);
                if(res.data.user_id !== userID){
                    navigate("/");
                    // return redirect("/");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const onSubmit = (values) => {
        console.log(values);
        editFranchiseRequest(values, id)
            .then(() => {
                alert('Modification de franchise effectuée');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
            enableReinitialize: true
        });


    return (
        !loading &&
        <Container>
            <HeaderTitle />
            <Row>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <Row className="justify-content-center gap-4">
                            <Col className="col-12 col-md-4 flex-center">
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
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="city"
                                    desc="Ville *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    placeholder="Ex: Paris"
                                    error={
                                        errors.city &&
                                        touched.city &&
                                        errors.city
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className="justify-content-center gap-4">
                            <Col className="col-12 col-md-4 flex-center">
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
                            <Col className="col-12 col-md-4 flex-center">
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
                        <Row className="justify-content-center gap-4">
                            <Col className="col-12 col-md-4 flex-center">
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
                            <Col className="col-12 col-md-4 flex-center">
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
                        <Row className="justify-content-center gap-4">
                            <Col className="col-6 col-md-4 flex-center">
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
                                    checked
                                />
                            </Col>
                            <Col className="col-6 col-md-4 flex-center mb-5">
                                <Button type="submit">
                                    Modifier ma demande
                                </Button>
                            </Col>
                            <Col className="col-6 col-md-4 flex-center d-none">
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
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default EditFranchiseRequestScreen;
