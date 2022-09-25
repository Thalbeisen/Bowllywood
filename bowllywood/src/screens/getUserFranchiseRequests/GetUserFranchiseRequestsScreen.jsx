import { getUserFranchiseRequests } from '../../services/users';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

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
                                </tr>
                            </thead>
                            <tbody>
                                {userFranchiseRequests.map(
                                    (franchiseContract, index) => {
                                        return (
                                            <tr>
                                                <td
                                                    key={
                                                        'franchiseContract-' +
                                                        { index }
                                                    }
                                                >
                                                    {
                                                        franchiseContract.createdAt
                                                    }
                                                </td>
                                                <td
                                                    key={
                                                        'franchiseContract-' +
                                                        { index }
                                                    }
                                                >
                                                    {
                                                        franchiseContract.estimatedAmount + ' €'
                                                    }
                                                </td>
                                                <td
                                                    key={
                                                        'franchiseContract-' +
                                                        { index }
                                                    }
                                                >
                                                    {
                                                        franchiseContract.hopedFinancing + ' €'
                                                    }
                                                </td>
                                                <td
                                                    key={
                                                        'franchiseContract-' +
                                                        { index }
                                                    }
                                                >
                                                    {
                                                        franchiseContract.shopLocation
                                                    }
                                                </td>
                                                <td
                                                    key={
                                                        'franchiseContract-' +
                                                        { index }
                                                    }
                                                >
                                                    {franchiseContract.status}
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
