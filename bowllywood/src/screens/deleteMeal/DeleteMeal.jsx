import './DeleteMeal.scss';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteMeal, getOneMeal } from '../../services/meal';

import HeaderTitle from '../../components/HeaderTitle';
import { Col, Row, Container } from 'react-bootstrap';
import Button from '../../components/Button';

const DeleteMeal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [meal, setMeal] = useState({});
    const [errMsg, setErrMsg] = useState({
        title: 'Erreur !',
        message: 'Une erreur est survenue. Le plat a été supprimé ou s\'est enfuit du restaurant...'
    });

    ////////////////////////
    // get the bowl infos //
    ////////////////////////
    useEffect(()=>{

        getOneMeal(id).then((res) =>
        {
            console.log(res)
            setMeal(res.data);
        }).catch((err)=>{
            // appeler fragment erreur et lui passer err ?
            console.log(err);

            // creation failed
            switch (err.response.status)
            {
                default:
                    setErrMsg({
                        title: `Erreur ${err.code} !`,
                        message: err.response.data
                    })
            }
        });
    }, [id]);

    /////////////////
    // user action //
    /////////////////
    const handleClick = ((event)=>{
        debugger;
        if (event.currentTarget.id === 'submitDeletion')
        {
            deleteMeal(id).then((res)=>{
                
                debugger;
                console.log(res)

            }).catch((err)=>{
                
                debugger;
                console.log(err);

                setErrMsg({
                    title: `Erreur ${err.code} !`,
                    message: err.response.data
                })
            });
        }
        else if (event.currentTarget.id === 'cancelDeletion')
        {
            console.log('toast qui prévient qu\'il sera rediriger');
            navigate('/menus')
        }
    });


    /////////////////////
    // return the view //
    /////////////////////
    return (
    <Container className="pb-5">
        <Row className="flex-center">
            <Col>
                <HeaderTitle>Suppression du bowl {meal.name ?? ''}</HeaderTitle>
            </Col>
        </Row>
        <Row className="justify-content-center text-center">
            <Col
                lg="8" className="bb">
                    <p>Êtes-vous sûr de vous supprimer le bowl ? Vous ne pourrez pas retourner en arrière.</p>
                <Row className="justify-content-center text-center gap-5">
                    <Button id="submitDeletion" onClick={handleClick}>Oui, supprimer le bowl</Button>
                    <Button id="cancelDeletion" bsType="secondary" onClick={handleClick} >Non, annuler la suppression</Button>
                </Row>
                
            </Col>
        </Row>
    </Container>
  )
}

export default DeleteMeal;