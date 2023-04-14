// data
import { useState, useEffect, Select } from 'react';
import { getAllBowls } from '../../services/meal';
// front
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
// utils
import { errorHandler } from '../../utils/errorHandler';
import 'react-toastify/dist/ReactToastify.css';
import './AdminListMeals.scss';
 
function BowlAdminList ({message}) {
   const [bowls, setBowls] = useState([]),
         [selectedType, setSelectedType] = useState('ALL'),
         [rotate, setRotate] = useState(false),
         [sortIcon, setSortIcon] = useState('up'),
         [refreshData, setRefreshData] = useState(false),
         [sweetNumber, setSweetNumber] = useState(0),
         [saltedNumber, setSaltedNumber] = useState(0),
         [isLoaded, setIsLoaded] = useState(false);

   if (message) {
      toast.dismiss()
      toast.success(message, {
         position: "bottom-center",
         autoClose: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: true,
         theme: "light"
      })
   }

   const typeSelection = [
      { value: 'ALL', label: 'Tous les types' },
      { value: 'SUCRE', label: 'Sucré' },
      { value: 'SALE', label: 'Salée' }
   ]

   useEffect(()=>{
      let cleaning = false;

      getAllBowls().then((res)=>{
         if (cleaning) return;
         res.data.sort((first, second)=> (first.name < second.name) ? 1 : -1)
         
         let sweetLentgh = res.data.filter(bowl => bowl.type === 'SUCRE').length;
         let saltedLentgh = res.data.filter(bowl => bowl.type === 'SALE').length;
         setSaltedNumber(sweetLentgh);
         setSweetNumber(saltedLentgh);

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
   }, [refreshData/*, selectedType*/])
      
   const sortList = () => {
      let newIcon = (sortIcon === 'down') ? 'up' : 'down';
      setSortIcon(newIcon)

      bowls.sort(()=>{
         return -1;
      })
   }

   const formatType = (typeCode) => {
      let type, typeColor;
      switch (typeCode) {
         case 'SUCRE':
            type = 'Sucré';
            typeColor = 'pinkColor'; // vanilla strawberry
            break;
         case 'SALE':
            type = 'Salé';
            typeColor = 'cyanColor';
            break;
         default:
            type = 'Indéfini';
            typeColor = '';
      }
      return {type, typeColor};
   }

   const BowlsRender = () => {
      if (bowls.length > 0)
      {
         return (bowls.map((bowl) => {
            let {type, typeColor} = formatType(bowl?.type)

            return (
            <ListGroupItem key={bowl?._id}
               action={true}
               active={true}
               href={`/menus/${bowl?._id}`}
               className={`bowlListItem px-0 ${(selectedType !== 'ALL' && bowl.type !== selectedType) ? 'd-none' : '' }`} >

               <Row className="d-flex justify-content-between m-0 pt-2 w-100">
                  <Col className="p-0">
                     <span className="mediumText">{bowl?.ingredients?.length} ingrédients</span>
                     <p>{bowl?.name}</p>
                  </Col>
                  <Col md={7} xl={5} className="p-0">
                     <p>{bowl?.allergenes?.length ?? 2 } allèrgènes</p>
                     <span className={`${typeColor}`}>{type}</span>
                  </Col>
               </Row>
            </ListGroupItem>)
         }))
      }
      else
      {
         return(
            <div className="d-flex align-items-center justify-content-center text-center mt-5">
                <span>Aucune bowl n'a encore été enregistré.</span>
            </div>)
      }
   }

   return (
   <div className="bowlCtnr d-flex flex-column px-5 py-4">

      <h2>Gérer les bowls</h2>
      <Row className="bowlStatistic justify-content-center" >
         <ReservationListStat number={saltedNumber} title="salés" />
         <ReservationListStat number={bowls.length} title="bowls en tout" />
         <ReservationListStat number={sweetNumber} title="sucrés" />
      </Row>

      <Row className="bowlListContent justify-content-center">
         <Col xs={12} lg={11} xl={10} className="" >
            <div className="mb-3 align-items-center">
               <p className="d-inline">Liste des bowls</p>
               <span className=" mx-2"> – </span> 
               <span>{
                  (selectedType !== 'ALL')
                  ? (selectedType !== 'SUCRE') 
                    ? 'sucrés'
                    : 'salés' 
                  : 'sucrés et salés'
               }</span>
               <Select options={typeSelection}
                 value={selectedType}
                 onChange={setSelectedType}
                 class="hide"
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