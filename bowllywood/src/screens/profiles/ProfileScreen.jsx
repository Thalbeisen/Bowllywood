import { Col, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './../../sass/styles.scss';

// import { getUserDetails } from '../../services/users';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useEffect, useState, useContext } from 'react';


function ProfileScreen() {
    // const authContext = useContext(AuthContext);
    // const userID = authContext.auth.userID;
    // console.log(userID);
    // const [userDetails, setUserDetails] = useState([]);
    // useEffect(() => {
    //     getUserDetails(userID)
    //         .then((res) => {
    //             setUserDetails(res.data);
    //             console.log(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
  return (
    <>
        <Container>
            <Row>
                <Col className="flex-center">
                    <img
                        src="Bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='fw-bold text-center'>MES INFORMATIONS PERSONELLES</Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className='justify-content-center gap-4'>
                                    <Col className="col-12 col-md-4">
                                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                                            <Form.Label>Prénom</Form.Label>
                                            <Form.Control type="text" value="" />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-12 col-md-4">
                                        <Form.Group className="mb-3" controlId="formBasicLastname">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="text" value="" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='justify-content-center gap-4'>
                                    <Col className="col-12 col-md-4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value="" />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-12 col-md-4">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Mot de passe</Form.Label>
                                            <Form.Control type="password" value="" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col className='flex-center'>
                                    <Button variant="primary text-black fw-bold mb-3" type="submit">Modifier</Button>
                                </Col>
                                <Card.Text className='text-muted'>
                                    Les informations enregistrées sont réservées à l’usage des services administratif et informatique 
                                    et ne peuvent être communiquées qu’aux destinataires suivants : [Siège et filiale de la société Bowllywood].
                                    Depuis la loi n° 78-17 du 6 janvier 1978 modifiée, relative à l’informatique, aux fichiers et aux libertés,
                                    toute personne peut obtenir communication et, le cas échéant, rectification ou suppression des informations
                                    la concernant, en s’adressant au service informatique par email à l'adresse support.info@bowllywood.fr 
                                    avec copie au DPO de l’établissement M. Garry DELMAS via l'addresse suivante: gdelmas.dpo@bowllywood.fr
                                </Card.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3 py-3'>
                <Col className='col-12 col-md-6'>
                    <Card>
                    <Card.Header className='fw-bold text-center'>MON RESTAURANT FAVORI</Card.Header>
                        <Card.Body className='text-center'>
                            <Card.Text>
                                22 Avenue du giratoire
                            </Card.Text>
                            <Card.Text>
                                78325 ANTARTIQUE
                            </Card.Text>
                            <Card.Text>
                                Lundi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Mardi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Mercredi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Jeudi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Vendredi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Samedi: ouvert de XXX à XXX
                            </Card.Text>
                            <Card.Text>
                                Dimanche: fermé
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='col-12 col-md-6'>
                    <Card>
                        <Card.Header className='fw-bold text-center'>INSÉRER LA VILLE DU RESTAURANT</Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src="assets/accueil.png" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col>
                    <Card>
                        <Card.Header className='fw-bold text-center'>MES EXIGENCES</Card.Header>
                            <Row>
                                <Col>
                                    <h3 className='text-center h5 mt-3'>Je souhaite recetevoir par email:</h3>
                                </Col>
                            </Row>
                        <Card.Body >
                            <Row>
                                <Col className='col-12 col-md-6 '>
                                    <InputGroup className="mb-3 flex-center">
                                        <InputGroup.Checkbox />
                                        <InputGroup.Text>Les actualités de la société.</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col className='col-12 col-md-6'>
                                    <InputGroup className="mb-3 flex-center">
                                        <InputGroup.Checkbox />
                                        <InputGroup.Text>Les dernières promotions.</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col className='col-12 col-md-6'>
                                    <InputGroup className="mb-3 flex-center">
                                        <InputGroup.Checkbox />
                                        <InputGroup.Text>Lorem ipsum dolor sit amet.</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col className='col-12 col-md-6'>
                                    <InputGroup className="mb-3 flex-center">
                                        <InputGroup.Checkbox />
                                        <InputGroup.Text>Lorem ipsum dolor sit amet.</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  );
}

export default ProfileScreen;