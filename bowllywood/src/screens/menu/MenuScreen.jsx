import './MenuScreen.scss';
import { useEffect, useState } from 'react';
import { getSaltedBowls, getSweetBowls } from '../../services/meal';
import { errorHandler } from '../../utils/errorHandler';
import HeaderTitle from '../../components/HeaderTitle';
import LoadingSpinner from '../../components/LoadingSpinner';
import jwt_decode from "jwt-decode";

function MenuScreen({ bowlsType="SALE" }) {

	const [bowls, setBowls] = useState([]),
		  [isAdmitted, setIsAdmitted] = useState(false),
		  [isLoaded, setIsLoaded] = useState(false);

	useEffect( () => {
		// get user role
		const currentTokens = localStorage.getItem("userTokens");
		if (currentTokens) {
			const decodedToken = jwt_decode(JSON.parse(currentTokens).token),
				  userRole = decodedToken?.roleID ?? '',
				  admittedRoles = ['ROLE_ADMIN', 'ROLE_CEO', 'ROLE_MANAGER', 'ROLE_COOK']
	    	setIsAdmitted((admittedRoles.includes(userRole)) ? true : false)
	    }

		// get sweet or salted bowls
		if (bowlsType === "SUCRE")
		{
			getSweetBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				if (err.status !== 404) errorHandler('TOAST', err)
			}).finally(()=>{
				setIsLoaded(true)
			})
		}
		else
		{
			getSaltedBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				if (err.status !== 404) errorHandler('TOAST', err)
			}).finally(()=>{
				setIsLoaded(true)
			})
		}
	}, [bowlsType] );

	// template for the list
	const MealTemp = ({ meal }) => {
		return (
			<li className="col-2">
				<div className="d-flex flex-column flex-center">
					<a href={`/menus/${meal._id}`} className="imgCtnr">
						<img src={meal?.image}
							alt={meal?.name}
							onError={(event) => {
							  event.target.src = "/bowlicon_grey.png"
							  event.onerror = null
							}}
							referrerpolicy="no-referrer"
							className="img-fluid"/>
					</a>
					<h3>{meal.name}</h3>
				</div>
			</li>
		)
	}

	// custom navigation to sweet or salted bowls.
	const LinkNav = () => {
		return (
			<section className={`menuNav ${bowlsType === 'SALE' ? 'rightNav' : 'leftNav'} px-4`}>
				<a href={`/menus/${bowlsType === 'SALE' ? 'desserts' : ''}`} className="mauikea_font">
					<span>{bowlsType === 'SALE' ? 'Desserts' : 'Bowls salés'}</span>
					<i className={`d-block fa-solid fa-arrow-${bowlsType === 'SALE' ? 'right' : 'left'} text-center`}></i>
				</a>
			</section>
	)}

	// check if the list est empty or not, and return the adapted rendering.
	const ListRendering = () => {
		if (bowls.length !== 0) {
			return (
				bowls.map((meal, index) => (
					<MealTemp key={index} meal={meal}/>
				))
			)
		} else {
			return (
				<li className="col-12">
					<p className='infoText textCenter'>Oups ! Aucun bowls de cette catégories n'a été trouvé...
					<br/>
					Venez nous voir au restaurant, vous y trouverez tous nos bowls.</p>
				</li>
			)
		}
	}

	return (
		<>
			<HeaderTitle>La carte <br/> {bowlsType === 'SALE' ? 'Nos bowls salés' : 'Nos desserts'}</HeaderTitle>
			{
				(isAdmitted)
				? <div className="d-flex justify-content-center">
					<a href="/menus/admin-list" className="addLink d-flex align-items-center border border-dark rounded py-3 px-4">
						<i className="fa-solid fa-bookmark me-3"></i>
						Gérer les bowls
					</a>
				</div>
				: ''
			}
			<section className="menuCtnr container">
				<ul className="row align-items-center justify-content-center">
					{
						(isLoaded) 
						? <ListRendering /> 
						: <span className='col-9'>
							<LoadingSpinner	/>
						</span>
					}
				</ul>
			</section>
			<LinkNav />
		</>
	)
}

export default MenuScreen;
