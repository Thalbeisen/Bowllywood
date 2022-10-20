import './MenuScreen.scss';
import { useEffect, useState } from 'react';
import { getSaltedBowls, getSweetBowls } from '../../service/meal';
import HeaderTitle from '../../components/HeaderTitle';

function MenuScreen({ bowlsType="SALE" }) {

	const [bowls, setBowls] = useState([]);

	useEffect( () => {
		
		// check if the asked bowls are the sweet or salted ones.
		if (bowlsType === "SUCRE")
		{
			getSweetBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				console.log(err);
			});
		}
		else
		{
			getSaltedBowls().then((res) => {
				setBowls(res.data);
			}).catch((err) => {
				console.log(err);
			});
		}
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
				<span className="d-block">fleche</span>
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
		<section className="menuCtnr container">
			<ul className="row align-items-center justify-content-center">
				{
					<ListRendering />
				}
			</ul>
		</section>
		<LinkNav />
	</>
	);
}

export default MenuScreen;
