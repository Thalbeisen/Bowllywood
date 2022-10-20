import { Col, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './../../sass/styles.scss';

function ProfileScreen() {
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
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='fw-bold'>MES INFORMATIONS PERSONELLES</Card.Header>
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
                                {/* <Card.Title>Special title treatment</Card.Title> */}
                                <Button variant="primary text-black fw-bold mb-3" type="submit">Modifier</Button>
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
            <Row className='my-5 py-5'>
                <Col className='col-12 col-md-6'>
                    <Card>
                    <Card.Header className='fw-bold'>MON RESTAURANT FAVORI</Card.Header>
                        <Card.Body>
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
                        <Card.Header className='fw-bold'>INSÉRER LA VILLE DU RESTAURANT</Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src="accueil.png?text=Image cap" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='fw-bold'>MES EXIGENCES</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                        <InputGroup.Text>Je souhaite recevoir par email les actualités de la société</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                        <InputGroup.Text>Je souhaite recevoir par email les dernières promotions</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                        <InputGroup.Text>Je souhaite recevoir par email les Lorem ipsum dolor sit amet, consectetur.</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                        <InputGroup.Text>Je souhaite recevoir par email les Lorem ipsum dolor sit amet, consectetur.</InputGroup.Text>
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