
import { useParams, useNavigate  } from 'react-router-dom';
import { cancelFranchiseRequest } from '../../services/franchiseRequest';
import { useEffect, useState } from 'react';

const FranchiseRequestCancelScreen = () => {

    const [franchiseRequestCancel, setFranchiseRequestCancel] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        cancelFranchiseRequest(id)
        .then((res) => {
            setFranchiseRequestCancel(res.data);
            console.log(res.data);
            navigate("/my-franchise-requests");
            })
            .catch((err) => {
                console.log(err);
            })

    }, [id]);
};

export default FranchiseRequestCancelScreen;
