import { getUserFranchiseRequests } from '../../services/users';
import { AuthContext } from '../../contexts/AuthContext';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const GetUserFranchiseRequestsScreen = () => {
    const [userFranchiseRequests, setUserFranchiseRequests] = useState([]);
    const authContext = useContext(AuthContext);
    const userID = authContext.auth.userID;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserFranchiseRequests(userID)
            .then((res) => {
                setUserFranchiseRequests(res.data.franchiseContracts);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    return (
        !loading &&
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>Référence</th>
                                    <th>Montant estimé</th>
                                    <th>Financement envisagé</th>
                                    <th>Ville d'implantation</th>
                                    <th>Status</th>
                                    <th>Modification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userFranchiseRequests.map(
                                    (franchiseContract) => {
                                        return (
                                            <tr
                                                className='text-center'
                                                key={franchiseContract._id}>
                                                <td>
                                                    {
                                                      franchiseContract.city + '-' + franchiseContract._id.substr(13, 10) + '-' + franchiseContract.shopLocation
                                                    }
                                                </td>
                                                <td>
                                                    {franchiseContract.estimatedAmount +
                                                        ' €'}
                                                </td>
                                                <td>
                                                    {franchiseContract.hopedFinancing +
                                                        ' €'}
                                                </td>
                                                <td>
                                                    {
                                                        franchiseContract.shopLocation
                                                    }
                                                </td>
                                                <td>
                                                    {franchiseContract.status}
                                                </td>
                                                <td>
                                                    <Button>
                                                        <Link
                                                            to={`/my-franchise-requests/${franchiseContract._id}`}
                                                            className="text-decoration-none text-black text-center"
                                                        >
                                                            <p>Consulter</p>
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
    );
};

export default GetUserFranchiseRequestsScreen;
