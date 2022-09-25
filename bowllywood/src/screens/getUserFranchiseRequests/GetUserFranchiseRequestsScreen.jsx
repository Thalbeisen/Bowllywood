import { getUserFranchiseRequests } from '../../services/users';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const GetUserFranchiseRequestsScreen = () => {

  const [userFranchiseRequests, setUserFranchiseRequests] = useState([])
  
  useEffect(() => {

    getUserFranchiseRequests('6324d81ea70c53011eaf4733')
    .then((res) => {
      setUserFranchiseRequests(res.data.franchiseContracts);

      // setUserFranchiseRequests(res.data);
      // console.log(res);
      // console.log(res.data.franchiseContracts);
      // console.log(userFranchiseRequests);
    }).catch((err) => {
      console.log(err);
    })
  }, [])





  
    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Montant estimé</th>
          <th>Financement envisagé</th>
          <th>Ville d'implantation</th>
          <th>Status</th>
          <th>Date de création</th>
        </tr>
      </thead>
      <tbody>
        {
        userFranchiseRequests.map((franchiseContract, index) => {
          console.log(franchiseContract);
        <tr>
          <td>{franchiseContract.estimatedAmount}</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td></td>
        </tr>
        })
        }
      </tbody>
    </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GetUserFranchiseRequestsScreen;