// data
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllBowls } from '../../services/meal';
// front
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
import Checkbox from '@mui/material/Checkbox';
// utils
import { errorHandler } from '../../utils/errorHandler';
import 'react-toastify/dist/ReactToastify.css';
import './AdminListMeals.scss';
 
function BowlAdminList () {
   const [bowls, setBowls] = useState([]),
         [selectedCategory, setSelectedCategory] = useState(['SALE', 'SUCRE']),
         [rotate, setRotate] = useState(false),
         [sortIcon, setSortIcon] = useState('up'),
         [refreshData, setRefreshData] = useState(false),
         [sweetNumber, setSweetNumber] = useState(0),
         [saltedNumber, setSaltedNumber] = useState(0),
         [isLoaded, setIsLoaded] = useState(false);

   const location = useLocation();

   useEffect(()=>{
      let cleaning = false;
      const message = location?.state?.message;
      if (message) {
         delete location?.state?.message;
         toast?.dismiss()
         toast.success(message, {
            position: "bottom-center",
            autoClose: true,
            closeOnClick: true,
            pauseOnHover: false,
            progress: true,
            theme: "light"
         })
      }

      return () => {
         cleaning = true
      }
   }, [location])

   useEffect(()=>{
      let cleaning = false;

      getAllBowls().then((res)=>{
         if (cleaning) return;
         res.data.sort((first, second)=> (first.name < second.name) ? 1 : -1)
         
         let sweetLentgh = res.data.filter(bowl => bowl.category === 'SUCRE').length;
         let saltedLentgh = res.data.filter(bowl => bowl.category === 'SALE').length;
         setSaltedNumber(saltedLentgh);
         setSweetNumber(sweetLentgh);
         setBowls(res.data)
      }).catch((err)=>{
         setBowls([])
         setSaltedNumber(0)
         setSweetNumber(0)
         switch (err?.response?.status)
         {
            case 404:
               break
            case 403:
               delete err?.response?.data?.message ;
               delete err?.message ;
               errorHandler('TOAST', err)
               break
            default:
               errorHandler('TOAST', err)
         }
      }).finally(()=>{
         setIsLoaded(true)
      })

      return () => {
         cleaning = true
      }
   }, [refreshData])
      
   useEffect(()=>{
      if (selectedCategory.length === 0) {
         setSelectedCategory(['SALE', 'SUCRE'])
      }
   }, [selectedCategory])

   const sortList = () => {
      let newIcon = (sortIcon === 'down') ? 'up' : 'down';
      setSortIcon(newIcon)

      bowls.sort(()=>{
         return -1;
      })
   }

   const formatCategory = (categoryCode) => {
      let category, categoryColor;
      switch (categoryCode) {
         case 'SUCRE':
            category = 'Sucré';
            categoryColor = 'sweetColor';
            break;
         case 'SALE':
            category = 'Salé';
            categoryColor = 'saltedColor';
            break;
         default:
            category = 'Indéfini';
            categoryColor = '';
      }
      return {category, categoryColor};
   }

   const BowlsRender = () => {
      if (bowls.length > 0)
      {
         return (bowls.map((bowl) => {
            let {category, categoryColor} = formatCategory(bowl?.category)

            return (
            <ListGroupItem key={bowl?._id}
               action={true}
               active={true}
               href={`/menus/${bowl?._id}`}
               className={`bowlListItem px-0 ${(!selectedCategory.includes(bowl?.category)) ? 'd-none' : '' }`} >
               <Row className="d-flex justify-content-between m-0 pt-2 w-100">
                  <Col className="p-0">
                     <span className="largeText">{bowl?.allergenes?.length ?? 2} allergènes</span>
                     <p>{bowl?.name}</p>
                  </Col>
                  <Col md={7} xl={5} className="p-0">
                     <p className={`${categoryColor}`}>{category}</p>
                     <span className="largeText">{bowl?.ingredients?.length} ingrédients</span>
                  </Col>
               </Row>
            </ListGroupItem>
            )
         }))
      }
      else
      {
         return(
            <div className="d-flex align-items-center justify-content-center text-center mt-5">
                <span>Aucune bowl n'a été trouvé.</span>
            </div>)
      }
   }

   const CheckboxText = ({text, checked})=>(<span className={`rounded px-3 py-1 m-0 ${(checked) ? 'checked' : ''}`}>{text}</span>)

   const handleChecked = ({target}) => {
      const {value, checked} = target;
      if (checked) {
         setSelectedCategory((selectedCategory)=>[...selectedCategory, value])
      } else {
         setSelectedCategory(selectedCategory.filter((type)=>type !== value))
      }
   }

   return (

   <div className="bowlCtnr d-flex flex-column px-5 py-4">

      <h2>Gérer les bowls</h2>
      <Row className="bowlStatistic justify-content-center">
         <ReservationListStat number={saltedNumber} title="salés" />
         <ReservationListStat number={bowls.length} title="bowls en tout" />
         <ReservationListStat number={sweetNumber} title="sucrés" />
      </Row>

      <Row className="bowlListContent justify-content-center">
         <Col xs={12} lg={11} xl={10} >
            <div className="d-flex align-items-center mb-3">
               <p className="d-inline">Liste des bowls</p>
               <span className="ms-3"> – </span> 
               
               <Checkbox
                  id='sale-checked'
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<CheckboxText text='salé' />}
                  checkedIcon={<CheckboxText text='salé' checked={true} />}
                  value='SALE'
                  checked={(selectedCategory.includes('SALE')) ? true : false}
                  onChange={handleChecked}
                  className="largeText"
                  />

               <Checkbox
                  id='sucre-checked'
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<CheckboxText text='sucré' />}
                  checkedIcon={<CheckboxText text='sucré' checked={true} />}
                  value='SUCRE'
                  checked={(selectedCategory.includes('SUCRE')) ? true : false}
                  onChange={handleChecked}
                  className="largeText"
                  />

            </div>
            <Row className="flex-column-reverse flex-md-row justify-content-between px-4" >
               <Col md={8} xxl={7} className="bowlList">
                  <div className="d-flex justify-content-end mb-3">
                     <i className={`fa-solid fa-rotate-right me-3 ${(rotate) ? 'rotate' : ''}`} 
                        onClick={() => {setRefreshData(!refreshData); setRotate(true) }}
                        onAnimationEnd={() => setRotate(false)}
                     ></i>
                     <i className={`fa-solid fa-arrow-${sortIcon}`} onClick={sortList}></i>
                  </div>

                  <ListGroup className="ps-5">
                  {
                     (isLoaded)
                     ? <BowlsRender />
                     : <div className="d-flex align-items-center justify-content-center">
                        <LoadingSpinner />
                        <span className="ms-3">Chargement des bowls</span>
                       </div>
                  }
                  </ListGroup>
               </Col>
               <Col md={3} xxl={3}>
                  <Link to="/menus/create" className="d-flex flex-column justify-content-center align-items-center text-decoration-none">
                     <i className="addIcon fa-solid fa-plus mb-3"></i>
                     <p className="addText text-center">Créer un bowl</p>
                  </Link>
               </Col>
            </Row>
         </Col>
      </Row>
   </div>
   )
}

export default BowlAdminList;