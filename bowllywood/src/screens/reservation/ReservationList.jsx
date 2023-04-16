// data
import { useState, useEffect } from 'react';
import { getUserReservations, getAllReservations } from '../../services/reservation';
import { getRestaurantDetail } from '../../services/restaurant';
// component
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
// date
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/fr_FR'
// utils
import { errorHandler } from '../../utils/errorHandler';
import jwt_decode from "jwt-decode";
import './ReservationScreen.scss';
 
const cl = console.log;

function ReservationList () {

	const [reservations, setReservations] = useState([]),
		  [cancel, setCancel] = useState(false),
		  [rotate, setRotate] = useState(false),
		  [sortIcon, setSortIcon] = useState('up'),
		  [seatNumber, setSeatNumber] = useState(0),
		  [selectedDate, setSelectedDate] = useState(new Date()),
		  [fullDate, setFullDate] = useState(''),
		  [capacity/*, setCapacity*/] = useState(40),
		  [openedHours/*, setOpenedHours*/] = useState(12),
		  [seatsPerDay, setSeatsPerDay] = useState(12),
		  [refreshData, setRefreshData] = useState(false),
		  [isLoaded, setIsLoaded] = useState(false),
		  [isConsumer, setIsConsumer] = useState(false);

	let today = dayjs().format('YYYY-MM-DD'),
		decodedToken,
		userRole;

	// get user token
	const currentTokens = localStorage.getItem("userTokens");
	if (currentTokens)
	{
		decodedToken = jwt_decode(JSON.parse(currentTokens).token);
		userRole = decodedToken?.roleID ?? '';
	}

	useEffect(()=>{
		cl('Enter for rendering')

		setCancel(false)

		// set selected date as formated
		let filterDate = dayjs(selectedDate).format('YYYY-MM-DD')
		setFullDate(filterDate)

		// sort table and define time informations
		const dataContent = (res) => {
			// place items depending of the date
			// descendent mode
			res.data.sort((first, second)=>{
				return (first.reservDate < second.reservDate) ? 1 : -1;
			})

			let allSeatNumber = 0;
			res.data.forEach((item)=>{
				let dateObj = item.reservDate;
				if (dateObj.includes('Z')) {
					dateObj = dateObj.split('Z')[0];
				}
				item.resDate = getFullDate(dateObj);
				item.resTime = getFullTime(dateObj);

				if (item.status === 'KEPT') { allSeatNumber += item.seatNr }
			})
			setSeatNumber(allSeatNumber)
		}

		// get data depending on the user role
		if (userRole === 'ROLE_USER')
		{
			setIsConsumer(true);
			getUserReservations().then((res)=>{
				if (cancel) return;

			    dataContent(res)
			    res.data.forEach((reservation)=>{
				    getRestaurantDetail(reservation.restaurantID).then((res)=>{
				    	reservation.city = res.data.city;
				    }).catch((err)=>{
				    	reservation.city = 'Ville introuvable';
				    }).finally(()=>{
						setReservations(res.data)
				    })
			    })

				/*const restaurantPromises = res.data.map((item) => {
					return getRestaurantDetail(item.restaurantID).catch((err)=>{
						item.city = 'Ville introuvable';
					})
				});

			  	Promise.all(restaurantPromises).then((restaurantDetails) => {
				    restaurantDetails.forEach((restaurant, index) => {
				    if (restaurant) {
				    	res.data[index].city = restaurant.data.city;
				    }});
			    });*/
			}).catch((err)=>{
				setSeatNumber(0)
				setReservations([])
				if (err?.response?.status !== 404) errorHandler('TOAST', err)
			}).finally(()=>{
				setIsLoaded(true)
			})
		}
		else
		{
			getAllReservations(filterDate).then((res)=>{
				if (cancel) return;
				dataContent(res)
				setReservations(res.data)
			}).catch((err)=>{
				setSeatNumber(0)
				setReservations([])
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
		}

		setSeatsPerDay(capacity*openedHours)

		return () => { 
		    setCancel(true);
			cl('cleaned unmounting render')
		}
	}, [refreshData, capacity, openedHours, selectedDate, cancel, userRole])
		
	const sortList = () => {
		let newIcon = (sortIcon === 'down') ? 'up' : 'down';
		setSortIcon(newIcon)

		reservations.sort(()=>{
			return -1;
		});
	}

	const getFullDate = (dateObj) => {
		if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
			dateObj = new Date(dateObj);
		}

		return dateObj.toLocaleDateString("fr-FR", 
		{
			year: 'numeric',
	    	month: 'long',
	    	day: 'numeric'
		});
	}

	const getFullTime = (dateObj) => {
		if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
			dateObj = new Date(dateObj);
		}

		let minutes = dateObj.getMinutes();
		return `${dateObj.getHours()}h${ (minutes !== 0) ? minutes : ''}`;
	}

	const formatStatus = (statusCode) => {
		let status, statusColor;
		switch (statusCode) {
			// kept
			case 'KEPT':
				status = 'Maintenu';
				statusColor = 'positiveColor';
				break;
			// cancelled
			case 'CLD':
				status = 'Annulé';
				statusColor = 'negativeColor';
				break;
			// closed
			case 'CLS':
				status = 'Terminé';
				statusColor = 'warningColor';
				break;
			default:
				status = 'Indéfini';
				statusColor = '';
		}
		return {status, statusColor};
	}

	const ReservationsRender = () => {
		if (reservations.length > 0)
		{
			return (reservations.map((reserv) => {
				let {status, statusColor} = formatStatus(reserv.status);

				return (
				<ListGroupItem key={reserv._id} action={true} active={true} href={`/reservations/${reserv._id}`} className="resListItem px-0">
					<Row className="d-flex justify-content-between m-0 pt-2 w-100">
						<Col className="p-0">
							<span className="mediumText">{reserv.seatNr} Personnes</span>
							{
				               (!isConsumer)
				               ? <p>{reserv.reservName}</p>
				               : <p>{reserv.city}</p>
				            }
						</Col>
						<Col md={7} xl={5} className="p-0">
							<p>
								{reserv.resDate}
								<span className="mediumText mx-2"> à </span>
								{reserv.resTime}
							</p>
							<span className={` ${statusColor}`}>{status}</span>
						</Col>
					</Row>
				</ListGroupItem>
				)
			})
			)
		}
		else
		{
			return(
				<div className="d-flex align-items-center justify-content-center text-center mt-5">
					{ (!isConsumer)
					 ? <span>Aucune réservation n'a encore été enregistrée dans votre restaurant pour la date sélectionnée.</span>
					 : <span>Vous n'avez encore pas réservé de place.</span>
					}
				</div>
			)
		}
	}

	return (
	<div className="resCtnr d-flex flex-column px-5 py-4">

		<h2>Gérer {(!isConsumer) ? 'les' : 'vos'} réservations</h2>
		{ (!isConsumer)
        ? <Row className="resStatistic justify-content-center" >
			<ReservationListStat number={(seatNumber !== 0) ? 12 : 27} title="Tables disponibles" subNumber={(seatNumber !== 0) ? 15 : '0'} subTitle="tables réservées" />
			<ReservationListStat number={seatNumber} title="Places réservées" subTitle={(today !== fullDate) ? getFullDate(selectedDate, 'DATS') : 'aujourd\'hui'} />
			<ReservationListStat number={Math.round((seatNumber*100/seatsPerDay) * 10 )/10} title="Occupation de la salle" subTitle="pour toute la journée" isPercent="true"/>
		</Row>
        : <Row className="resStatistic justify-content-center" >
			<ReservationListStat number={reservations.length} title={(reservations.length > 1 ) ? 'réservations' : 'réservation'} />
		</Row>
        }

		<Row className="resListContent justify-content-center">
			<Col xs={12} lg={11} xl={10} className="" >
				<div className="mb-3 align-items-center">
					<p className="d-inline">Liste {(!isConsumer) ? 'des' : 'de vos'} réservations</p>
					{
		               (!isConsumer)
		               ? <>
						<span className=" mx-2"> – </span> 
						<span>journée du {getFullDate(selectedDate, 'DATS')}</span>
						<DatePicker 
							locale={locale}
							allowClear={false}
							bordered={false}
							size='large'
							value={selectedDate ? dayjs(selectedDate) : null}
							onChange={setSelectedDate}/>
		                </>
		               : ''
		            }
				</div>
				<Row className="flex-column-reverse flex-md-row justify-content-between px-4" >
					<Col md={8} xxl={7} className="resList">
						<div className="d-flex justify-content-end mb-3">
							{/*<div>
								<i className="fa-solid fa-grip me-3" onClick={console.log('oui')}></i>
								<i className="fa-solid fa-bars-staggered" onClick={console.log('oui')}></i>
							</div>*/}
							<i className={`fa-solid fa-rotate-right me-3 ${(rotate) ? 'rotate' : ''}`} 
								onClick={() => {setRefreshData(!refreshData); setRotate(true) }}
						        onAnimationEnd={() => setRotate(false)}
							></i>
							<i className={`fa-solid fa-arrow-${sortIcon}`} onClick={sortList}></i>
						</div>

						<ListGroup className="ps-5">
						{
							(isLoaded)
							? <ReservationsRender />
							: <div className="d-flex align-items-center justify-content-center">
								<LoadingSpinner />
								<span className="ms-3">Chargement {(!isConsumer) ? 'des' : 'de vos'} réservations</span>
							  </div>

						}
						</ListGroup>
					</Col>
					<Col md={3} xxl={3}>
						<Link to="/reservations/form" className="d-flex flex-column justify-content-center align-items-center text-decoration-none">
							<i className="addIcon fa-solid fa-plus mb-3"></i>
							<p className="addText text-center">{(!isConsumer) ? 'Ajouter une réservation' : 'Réserver à nouveau'}</p>
						</Link>
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
	)
}

export default ReservationList;