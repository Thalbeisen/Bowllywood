import { Link } from 'react-router-dom';
import { getUserFranchiseRequests } from '../../services/users';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const GetUserFranchiseRequestsScreen = () => {
    const [userFranchiseRequests, setUserFranchiseRequests] = useState([]);

    useEffect(() => {
        getUserFranchiseRequests('6324d81ea70c53011eaf4733')
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
