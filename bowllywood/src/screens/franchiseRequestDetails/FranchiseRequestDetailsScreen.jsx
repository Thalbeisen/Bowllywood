
import { Link, useParams } from 'react-router-dom';
import { getFranchiseRequestDetail } from '../../services/franchiseRequest';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FranchiseRequestDetailsScreen = () => {

    const [franchiseRequestDetail, setFranchiseRequestDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        getFranchiseRequestDetail(id)
        .then((res) => {
            setFranchiseRequestDetail(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        !loading &&
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Date de création</th>
                                    <th>Montant estimé</th>
                                    <th>Financement envisagé</th>
                                    <th>Ville d'implantation</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>   
                              <tr>
                                <td>{franchiseRequestDetail.createdAt}</td>
                                <td>{franchiseRequestDetail.estimatedAmount}</td>
                                <td>{franchiseRequestDetail.hopedFinancing}</td>
                                <td>{franchiseRequestDetail.shopLocation}</td>
                                <td>{franchiseRequestDetail.status}</td>
                              </tr>
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-evenly'>
                            <Button>
                                <Link
                                    to={`/my-franchise-requests/edit/${id}`}
                                    className="text-decoration-none text-black text-center"
                                >
                                    <p>Modifier</p>
                                </Link>
                            </Button>
                            <Button>
                                <Link
                                    to={`/my-franchise-requests/cancel/${id}`}
                                    className="text-decoration-none text-black text-center"
                                >
                                    <p>Annuler</p>
                                </Link>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
    );
};

export default FranchiseRequestDetailsScreen;
