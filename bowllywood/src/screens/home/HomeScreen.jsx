import { getAllRestaurants } from '../../services/restaurant';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './../../sass/styles.scss';



const Home = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    useEffect(() => {
        getAllRestaurants()
            .then((res) => {
                setAllRestaurants(res.data);
                console.log(res.data)
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
                            src="Bowllywood.png"
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
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="assets/slide2.jpg"
                                alt="Second slide"
                                />

                                <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="assets/slide3.jpg"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                                    <p>Description</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-6 col-md-3 flex-center'>
                        <Row>
                            <Col className='text-center'>
                                <div><i className="fa-solid fa-truck growIcon my-5"></i></div>
                                <h2>A trouver</h2>
                                <p>Description</p>
                            </Col>
                            </Row>
                    </Col>
                    <Col className='col-6 col-md-3 flex-center'>
                        <Row>
                            <Col className='text-center'>
                                <div><i className="fa-solid fa-bowl-food growIcon my-5"></i></div>
                                <h2>Produits locaux</h2>
                                <p>Description</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-6 col-md-3 flex-center'>
                    <Row>
                        <Col className='text-center'>
                            <div><i className="fa-solid fa-truck growIcon my-5"></i></div>
                            <h2>Livraison à domicile</h2>
                            <p>Description</p>
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
                            <Card.Img variant="top" src="banana-berry-bowl.jpg" />
                            <Card.Body>
                                <Card.Title>Card title <span>17.95€</span></Card.Title>
                                <Card.Text>
                                    Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1,.
                                </Card.Text>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, non laboriosam explicabo iste dolor, quas exercitationem saepe nesciunt cupiditate eius commodi? Incidunt maxime iusto nam, nobis cupiditate quasi atque sapiente!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="banana-berry-bowl.jpg" />
                            <Card.Body>
                                <Card.Title>Card title <span>17.95€</span></Card.Title>
                                <Card.Text>
                                    Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1,.
                                </Card.Text>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, non laboriosam explicabo iste dolor, quas exercitationem saepe nesciunt cupiditate eius commodi? Incidunt maxime iusto nam, nobis cupiditate quasi atque sapiente!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="banana-berry-bowl.jpg" />
                            <Card.Body>
                                <Card.Title>Card title <span>17.95€</span></Card.Title>
                                <Card.Text>
                                    Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1,.
                                </Card.Text>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, non laboriosam explicabo iste dolor, quas exercitationem saepe nesciunt cupiditate eius commodi? Incidunt maxime iusto nam, nobis cupiditate quasi atque sapiente!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="banana-berry-bowl.jpg" />
                            <Card.Body>
                                <Card.Title>Card title <span>17.95€</span></Card.Title>
                                <Card.Text>
                                    Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1, Ingrédient 1,.
                                </Card.Text>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, non laboriosam explicabo iste dolor, quas exercitationem saepe nesciunt cupiditate eius commodi? Incidunt maxime iusto nam, nobis cupiditate quasi atque sapiente!
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
                    {allRestaurants.map((item)=>(
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
