import './MealScreen.scss';
// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { getOneMeal, deleteMeal } from '../../services/meal';
import { getOneStock } from '../../services/stock';
import { imgurDeleteImage } from '../../services/imgur';
import { errorHandler } from '../../utils/errorHandler';
import jwt_decode from "jwt-decode";
// front
import { Col, Row, Container } from 'react-bootstrap';
import HeaderTitle from '../../components/HeaderTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

const MealScreen = () => {
   const [bowl, setBowl] = useState(null),
         [cleaning, setCleaning] = useState(false),
         [imgError, setImgError] = useState(false),
         [isAdmitted, setIsAdmitted] = useState(false),
         [isLoaded, setIsLoaded] = useState(false),
         [ingredientsLoaded, setIngredientsLoaded] = useState(false),
         [ingredients, setIngredients] = useState([]);

   const navigate = useNavigate(),
         { id } = useParams(),
         bowlID = id; // bowlID = useParams().id
   let decodedToken,
       userRole; 

   // get user token
   const currentTokens = localStorage.getItem("userTokens")
   if (currentTokens)
   {
      decodedToken = jwt_decode(JSON.parse(currentTokens).token)
      userRole = decodedToken?.roleID ?? '';
   }

   // get data
   useEffect( () => {
      setCleaning(false);
      let stockArr = [],
          ingredientsID = [];

      let admittedRoles = ['ROLE_ADMIN'] ;
      setIsAdmitted(admittedRoles.includes(userRole))

      // get data
      getOneMeal(bowlID).then((res)=>{
         if (cleaning) return;

         let fetchStocks = async () => {
            for (const ingredientID of res.data.ingredients) {
               try
               {
                  const currStock = await getOneStock(ingredientID);
                  stockArr.push(currStock?.data?.name ??  '')
               }
               catch(err)
               {
                  // nothing to inform
               }
            }
            setIngredients(stockArr)
            setIngredientsLoaded(true)
         }

         fetchStocks()
         setBowl(res.data)

      }).catch((err)=>{
         errorHandler('REDIRECT', err, navigate, 'bowl')      
      }).finally(()=>{
         setIsLoaded(true)
      })

      return ()=>{
         setCleaning(true)
      }

   }, [bowlID, userRole, navigate] )

   const navigateForm = () => {
      navigate(`/menus/edit/${bowlID}`, { replace: true })
   }

   const cancelReservationBtn = async (bowlID, bowlImage) => {

      try
      {
         let deletedMeal = await deleteMeal(bowlID);
         console.log(deletedMeal)
         if (deletedMeal)
         {
            let deletedImage = await imgurDeleteImage(bowlImage);
            console.log(deletedImage)
         }

         navigate('/menus/admin-list', 
         {
            replace: true, 
            state: {
               message: 'Le bowl a été supprimé avec succès'
            } 
         })
      }
      catch(err)
      {
         console.log(err)
         errorHandler('TOAST', err)
      }

      /*deleteMeal(bowlID).then((res) => {
         navigate('/menus/admin-list', 
         {
            replace: true, 
            state: {
               message: 'Le bowl a été supprimé avec succès'
            } 
         })
      }).catch((err) => {
         errorHandler('TOAST', err)
      })*/
   }

   const Title = () => {
      if (isAdmitted) {
         return ( <>
         Le {bowl?.name}
         <div className="bowlBtnCtnr d-inline-flex align-items-end ms-5">
            <i className='fa-solid fa-pen-to-square me-3' onClick={()=>{navigateForm(bowl?._id)}}></i>
            <i className='fa-solid fa-square-xmark negativeColor' onClick={()=>{cancelReservationBtn(bowl?._id, bowl?.image)}}></i>
         </div>
         </> )
      } else {
         return `Le ${bowl?.name}`
      }
   }

   return (
      <>
         <HeaderTitle>{(isLoaded) ? <Title /> : 'Chargement du bowl'}</HeaderTitle>

         <Container lg={12} className="mealCtnr my-5">
            <Row className="text-start justify-content-center gap-5">
               {
                  (isLoaded) 
                  ? <>
                     <Col xs={4} className="imgCtnr">
                        {(!imgError)
                          ? <img
                              src={bowl?.image}
                              alt={bowl?.name}
                              onError={(event) => {
                                 let err = {
                                      code: '',
                                      message: "L'image du bowl n'a pas pu être récupérée."
                                 }
                                 errorHandler('TOAST', err)
                                 setImgError(true)
                              }}
                              referrerPolicy="no-referrer"
                              className="img-fluid"/>
                          : <img 
                              src="/bowlicon_grey.png"
                              alt='Bowllywood default image'
                              referrerPolicy="no-referrer"
                              className="img-fluid" />
                      }
                     </Col>
                     <Col xs={7}>
                        <div>
                           <h2>{bowl?.price}</h2>
                           <p>{bowl?.description}</p>
                        </div>
                        <Row className="mt-5">
                           <Col xs={6}>
                              <h4>Ingrédients</h4>
                              {
                                 (ingredientsLoaded)
                                 ? (ingredients.length > 0)
                                    ? <ul>{ingredients.map((ingr, index)=><li key={index}>{ingr}</li>)}</ul>
                                    : <p className="infoStyle">Oups... Tous les ingrédients se sont enfuit ! Nous partirons à leur recherche très bientôt. Excusez-nous pour la gène occasionnée.</p>
                                 : <LoadingSpinner />
                              }
                           </Col>
                           <Col xs={6}>
                              <h4>Allergènes</h4>
                              <p className="infoStyle pe-5">Aucun allergène renseigné pour cette recette ! Vous pourrez profiter tranquillement.</p>
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