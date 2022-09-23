import './MenuScreen.scss';
import { useEffect, useState } from 'react';
import { getSatlyMeals } from '../../service/meal';
import HeaderTitle from '../../components/HeaderTitle';

// donnée en dure
import tereakiImg from '../../assets/img/menu/sale/tereakiWeb.jpg';
import tahitiImg  from '../../assets/img/menu/sale/tahitiWeb.jpg';
import veggieImg  from '../../assets/img/menu/sale/veggieWeb.jpg';

function MenuScreen() {	
	const [meals, setMeals] = useState([]);
	useEffect( () => {
		getSatlyMeals().then((res) => {
			setMeals(res.data);
		}).catch((err) => {
			console.log(err);
		});
	}, [] );

const MealTemp = ({ meal }) => {	
	const imgPath = `/menu/${meal.image}`;
	const mealPath = `menus/${meal._id}`;

	return (
		<li className="col-2">
			<div className="d-flex flex-column flex-center">
				<a href='' className="imgCtnr">
					<img
					src={imgPath}
					alt={meal.name}
					/>
				</a>  	
				<h3>{meal.name}</h3>
			</div>
		</li>
	)
}

return (
	<>
		<HeaderTitle />
		<section className="menuCtnr container">
			<ul className="row align-items-center justify-content-center gap-3">
				{
					meals.map((meal, index) => (
						<MealTemp key={index} meal={meal}/>
					))
				}
			</ul>
		</section>
		<section className="menuNav d-flex flex-column align-items-end px-3">
			<a href="#"  className="mauikea_font">
				Desserts
				<span className="d-block">fleche</span>
			</a>
		</section>
	</>
	);
}

export default MenuScreen;
