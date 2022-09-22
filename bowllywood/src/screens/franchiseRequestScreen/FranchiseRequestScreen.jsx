import './FranchiseRequestScreen.scss';
import { useEffect, useState } from 'react';
import { addFranchiseRequest } from '../../service/franchiseRequest';
import HeaderTitle from './../../components/HeaderTitle';
import InputText from './../../components/Input';
import { Col, Row, Container } from 'react-bootstrap';
import './../../sass/styles.scss';

const FranchiseRequestScreen = () => {
    const [franchiseRequest, setFranchiseRequest] = useState(null);
    useEffect( () => {
		addFranchiseRequest().then((res) => {
			setFranchiseRequest(res.data);
		}).catch((err) => {
			console.log(err);
		}) 
	}, [] )

    return (
        <>
        <Container>
             <HeaderTitle />
            <Row>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                    <InputText
                        name="phone"
                        desc="Numéro de téléphone"
                        type="text"
                        value=""
                    />
                </Col>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                <InputText
                    name="city"
                    desc="Ville"
                    type="text"
                    value=""
                />
                </Col>
            </Row>

            <Row>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                    <InputText
                        name="estimatedAmount"
                        desc="Montant estimé de l'investissement"
                        type="text"
                        value=""
                    />
                </Col>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                    <InputText
                        name="hopedFinancing"
                        desc="Financement envisagé"
                        type="text"
                        value=""
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                    <InputText
                        name="shopLocation"
                        desc="Ville d'implantation"
                        type="text"
                        value=""
                    />
                </Col>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center">
                    <InputText
                        name="foodServiceExperience"
                        desc="Expérience dans la restauration"
                        type="text"
                        value=""
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center mb-5">
                    <InputText
                        name="conditionOfUse"
                        desc="J'accepte les CGU"
                        type="radio"
                        value=""
                    />
                </Col>
                <Col className="col-12 col-md-6 ps-5 d-flex justify-content-center mb-5">
                    <InputText
                        name="user_id"
                        desc=""
                        type="hidden"
                        value=""
                    /> 
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default FranchiseRequestScreen;