import { getAllRestaurants } from '../../services/restaurant';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './../../sass/styles.scss';
import { sortingArray } from '../../utils/sortingArray';

const Home = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    useEffect(() => {
        getAllRestaurants()
            .then((res) => {
                const result = res.data;
                sortingArray(result)
                setAllRestaurants(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Container>
            <Row>
                <Col className='col-12 flex-center'>
                        <img
                            src="bowllywood.png"
                            alt="Logo du restaurant de bowls nommé Bowllywood"
                            className="img-fluid"
                        />
                </Col>
                <Col className='col-12 flex-center'>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide1.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Des ingrédients qualitatifs</h3>
                                <p>La plupart de nos ingrédients proviennent de producteurs bio locaux!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide2.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Des plats attrayants</h3>
                                <p>Parce que manger doit être à la fois une expérience visuelle que gustative.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide3.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Une ambiance cosy</h3>
                                <p>
                                    Pour se sentir comme à la maison.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide4.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Vous êtes le chef</h3>
                                <p>
                                    Lancez-vous et laissez votre inspiration créer votre bowl!
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide5.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Un personnel à votre écoute</h3>
                                <p>
                                    Un service d'exception pour une clientèle d'exception.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="assets/slide6.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Un cadre propice au calme</h3>
                                <p>
                                    Venez vous retrouver en famille ou entre amis.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className='my-5'>
                <Col className='col-6 col-md-3 flex-center'>
                    <Row>
                        <Col className='text-center'>
                            <div>
                                <i className="fa-solid fa-bowl-food growIcon my-5"></i>
                                <h2>Recettes originales</h2>
                                <p>Profitez de nos recettes ou laissez libre cours à votre imagination!</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className='col-6 col-md-3 flex-center'>
                    <Row>
                        <Col className='text-center'>
                            <div><i className="fa-solid fa-truck growIcon my-5"></i></div>
                            <h2>Bon pour la planète et votre corps</h2>
                            <p>Qui à dit que bien manger était compliqué?</p>
                        </Col>
                    </Row>
                </Col>
                <Col className='col-6 col-md-3 flex-center'>
                    <Row>
                        <Col className='text-center'>
                            <div><i className="fa-solid fa-bowl-food growIcon my-5"></i></div>
                            <h2>Produits locaux</h2>
                            <p>Ingrédients issus (pour la plupart) de circuit courts</p>
                        </Col>
                    </Row>
                </Col>
                <Col className='col-6 col-md-3 flex-center'>
                    <Row>
                        <Col className='text-center'>
                            <div><i className="fa-solid fa-truck growIcon my-5"></i></div>
                            <h2>Livraison à domicile</h2>
                            <p>Limitée à un rayon de 15km</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col className='col-6 dark-green my-5'>
                    <h2>Nos meilleures ventes</h2>
                </Col>
            </Row>

            <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card>
                        <Card.Img variant="top" src="/menu/salty/marianaWeb.jpg" />
                        <Card.Body>
                            <Card.Title>Mariana <span>17.95€</span></Card.Title>
                            <Card.Text>
                                Base semoule, Poivrons jaunes, Radis, Graines de courges, Salade, Sauce spéciale semoule.
                            </Card.Text>
                            <Card.Text>
                                Notre célèbre Mariana Grande validé par nos clients toulousains.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="/menu/salty/martaWeb.jpg" />
                        <Card.Body>
                            <Card.Title>Marta <span>9.99€</span></Card.Title>
                            <Card.Text>
                                Base semoule, Poivrons jaunes, Radis, Graines de courges, Salade, Sauce spéciale semoule.
                            </Card.Text>
                            <Card.Text>
                                Le bowl qui tue!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="/menu/salty/brookeWeb.jpg" />
                        <Card.Body>
                            <Card.Title>Tahiti <span>10.99€</span></Card.Title>
                            <Card.Text>
                                Base semoule, Poivrons jaunes, Radis, Graines de courges, Salade, Sauce spéciale semoule.
                            </Card.Text>
                            <Card.Text>
                                Sa fraicheur va vous doucher!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="/menu/salty/olssonWeb.jpg" />
                        <Card.Body>
                            <Card.Title>Maori <span>14.95€</span></Card.Title>
                            <Card.Text>
                                Base semoule, Poivrons jaunes, Radis, Graines de courges, Salade, Sauce spéciale semoule.
                            </Card.Text>
                            <Card.Text>
                                Là pour être honnête j'ai plus d'inspi.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className=' offset-6 col-6 dark-green my-5'>
                    <h2>Nos enseignes</h2>
                </Col>
            </Row>

            <Row className='flex-center'>
                {allRestaurants.map((item) => (
                    <Col key={item._id} className='col-12 col-md-3 my-2 flex-center'>
                        <Card border="dark" style={{ width: '18rem' }} className='text-center'>
                            <Card.Header>{item.city}</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.address}</Card.Title>
                                <Card.Text>
                                    Horaire du jour: 10h 22h
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{item.phone}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default Home;
