import './MenuScreen.scss';
import { useEffect, useState } from 'react';
import { getSaltedBowls, getSweetBowls } from '../../services/meal';
import HeaderTitle from '../../components/HeaderTitle';
import { Oval } from 'react-loader-spinner';

let decodedTokens;

function MenuScreen({ bowlsType="SALE" }) {

	const [bowls, setBowls] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [isConnected, setIsConnected] = useState(false);

	useEffect( () => {
		// check if the asked bowls are the sweet or salted ones.
		if (bowlsType === "SUCRE")
		{
			getSweetBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				console.log(err);
			}).finally(()=>{
				setLoaded(true)
			});
		}
		else
		{
			getSaltedBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				console.log(err);
			}).finally(()=>{
				setLoaded(true)
			});
		}

		decodedTokens = JSON.parse(localStorage.getItem('userTokens'));
    	setIsConnected((decodedTokens?.token) ? true : false);
	}, [bowlsType] );

// template for the list
const MealTemp = ({ meal }) => {
	return (
		<li className="col-2">
			<div className="d-flex flex-column flex-center">
				<a href={`/menus/${meal._id}`} className="imgCtnr">
					<img
					src={`/menu/${meal.image}`}
					alt={meal.name}
					/>
				</a>  	
				<h3>{meal.name}</h3>
			</div>
		</li>
	)
}

// custom navigation to desserts or salted bowls.
const LinkNav = () => {
	return (
		<section className={`menuNav ${bowlsType === 'SALE' ? 'rightNav' : 'leftNav'} px-4`}>
			<a href={`/menus/${bowlsType === 'SALE' ? 'desserts' : ''}`} className="mauikea_font">
				{bowlsType === 'SALE' ? 'Desserts' : 'Bowls'}
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
			(isConnected)
			? <div className="d-flex justify-content-center">
				<a href="/menus/create" className="addLink d-flex align-items-center">
					<i className="fa-solid fa-circle-plus me-3"></i>
					Créer un nouveau bowl
				</a>
			</div>
			: ''
		}
		<section className="menuCtnr container">
			<ul className="row align-items-center justify-content-center">
				{
					(loaded) 
					? <ListRendering /> 
					: <span className='col-9'>
						<Oval
							strokeWidth="5"
							strokeWidthSecondary="5"
							secondaryColor="#000"
							height="25"
							width="25"
							color="#CECECE"
							ariaLabel="loading"
							wrapperStyle
						/>
					</span>
				}
			</ul>
		</section>
		<LinkNav />
	</>
	);
}

export default MenuScreen;
