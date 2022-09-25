import { getUserFranchiseRequests } from '../../services/users';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const GetUserFranchiseRequestsScreen = () => {

  const [userFranchiseRequests, setUserFranchiseRequests] = useState([])
  
  useEffect(() => {
    getUserFranchiseRequests('6324d81ea70c53011eaf4733').then((res) => {
      setUserFranchiseRequests(res.data);
      // console.log(res);
      // console.log(res.data);
      console.log(userFranchiseRequests);
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
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GetUserFranchiseRequestsScreen;