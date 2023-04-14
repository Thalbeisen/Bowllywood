import './MealScreen.scss';
// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { getOneMeal, deleteMeal } from '../../services/meal';
import { getOneStock } from '../../services/stock';
import { errorHandler } from '../../utils/errorHandler';
import jwt_decode from "jwt-decode";
// front
import { Col, Row, Container } from 'react-bootstrap';
import HeaderTitle from '../../components/HeaderTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

const MealScreen = () => {
   const [bowl, setBowl] = useState(null),
         [isConsumer, setIsConsumer] = useState(false),
         [isLoaded, setIsLoaded] = useState(false),
         [ingredients, setIngredients] = useState([]);

   const navigate = useNavigate(),
         { id } = useParams(),
         bowlID = id; // bowlID = useParams().id
   let decodedToken,
       userRole; 

   // get user token
   const currentTokens = localStorage.getItem("userTokens")
   console.log(JSON.parse(localStorage.getItem('userTokens')))
   console.log(currentTokens)

   if (currentTokens)
   {
      decodedToken = jwt_decode(JSON.parse(currentTokens).token)
      userRole = decodedToken?.roleID ?? '';
   }

   // get data
   useEffect( () => {
      let cleaning = false,
          stockArr = [];

      setIsConsumer((userRole === 'USER_ROLE') ? true : false)

      // get data
      getOneMeal(bowlID).then((res)=>{
         if (cleaning) return;

         setBowl(res.data)

         res.data.ingredients.forEach((ingredientID)=> {
            getOneStock(ingredientID).then((stock)=>{
               stockArr.push(stock.name)
            }).catch((err)=>{
               errorHandler('TOAST', err, 'ingrédient')
            }).finally(()=>{
               debugger
               // si s'arrête ici apès tout le traitement
               // trouver une solution pour pouvoir faire le loaded et le setIng en dehors de la boucles.
               // vérif si le finally est appelé à la fin de la boucle ou après chaque itération.
            })
         })

      }).catch((err)=>{
         errorHandler('REDIRECT', err, navigate, 'bowl')      
      }).finally(()=>{
         debugger
         // si s'arrête ici apès tout le traitement, loaeded et setingr ici. sinon, dans le finally de l'autre
         setIsLoaded(true)
         setIngredients(stockArr)
      })
   }, [bowlID, userRole, navigate] )


   const navigateForm = () => {
      navigate.navigation(`/menus/edit/${bowlID}`, { action: 'EDIT', replace: true })
   }

   const cancelReservationBtn = (bowlID) => {
      deleteMeal(bowlID).then((res) => {
         navigate.navigation('menus/admin-list', { message: 'Le bowl a été supprimé avec succès', replace: true})
      }).catch((err) => {
         errorHandler('TOAST', err)
      })
   }

   return (
      <>
         <HeaderTitle>{ (isLoaded) ? `Le ${bowl?.name}` : 'Chargement du bowl'}</HeaderTitle>
         {
            (!isConsumer && isLoaded)
            ? <div className="d-flex align-items-end">
               <i className='fa-solid fa-pen-to-square me-3' onClick={()=>{navigateForm(bowl?._id)}}></i>
               <i className='fa-solid fa-square-xmark negativeColor' onClick={()=>{cancelReservationBtn(bowl?._id)}}></i>
            </div>:''
         }

         <Container lg className="mealCtnr my-5">
            <Row className="text-start justify-content-center gap-5">
               {
                  (isLoaded) 
                  ? <>
                     <Col xs={4} className="imgCtnr">
                        <img src={`/menu/${bowl?.image}`} alt={bowl?.name} className="img-fluid"/>
                     </Col>
                     <Col xs={7}>
                        <p>{bowl?.description}</p>
                        <h2>{bowl?.price}</h2>
                        <Row className="mt-5">
                           <Col xs={6}>
                              <h4>Ingrédients</h4>
                              <ul> {ingredients.map((ingr)=><li>{ingr}</li>)}</ul>
                           </Col>
                           <Col xs={6}>
                              <h4>Allergènes</h4>
                              <p className="infoStyle">Aucun allergène renseignée pour cette recette ! Vous pourrez profiter tranquillement.</p>
                           </Col>
                        </Row>
                     </Col>
                  </>
                  : <LoadingSpinner />
               }
            </Row>   
         </Container>
      </>
   )
}
export default MealScreen;