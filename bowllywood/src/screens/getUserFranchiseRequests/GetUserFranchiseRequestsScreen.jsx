// import jwt_decode from "jwt-decode";

import { Link } from 'react-router-dom';
import { getUserFranchiseRequests } from '../../services/users';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

// const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
// const token =   authHeaders['token'];
// const decoded = jwt_decode(token);
// const userID = decoded.id

const GetUserFranchiseRequestsScreen = () => {
    const [userFranchiseRequests, setUserFranchiseRequests] = useState([]);
    // const authContext = useContext(AuthContext);
    // const userID = authContext.auth.userID;
    useEffect(() => {
        // getUserFranchiseRequests(userID)
        getUserFranchiseRequests('634fa0e0814451ed5905fe24')
            .then((res) => {
                setUserFranchiseRequests(res.data.franchiseContracts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
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
                                    <th>Modification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userFranchiseRequests.map(
                                    (franchiseContract) => {
                                        return (
                                            <tr
                                                key={franchiseContract._id}>
                                                <td>
                                                    {
                                                        franchiseContract.createdAt
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
        </>
    );
};

export default GetUserFranchiseRequestsScreen;
