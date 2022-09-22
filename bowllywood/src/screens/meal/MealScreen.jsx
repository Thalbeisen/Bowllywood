// 62c6dd067a81f4008c1a667c
import './MealScreen.scss';
import { useEffect, useState } from 'react';
import { getOneMeal } from '../../service/meal';
import HeaderTitle from '../../components/HeaderTitle';

const MealScreen = () => {

	const [meal, setMeal] = useState(null);
	useEffect( () => {
		getOneMeal('62c6dd067a81f4008c1a667c').then((res) => {
			setMeal(res.data);
		}).catch((err) => {
			console.log(err);
		});
	}, [] )
	console.log(meal);
	
	return (
		<>
			<HeaderTitle />
			<section className="mealCtnr container-lg my-5">
				<div className="row text-start justify-content-center gap-5">
					<div className="imgCtnr col-4">
						<img src="/menu/sale/tahitiWeb.jpg" alt="Image bowl tahiti" className="img-fluid"/>
					</div>
					<div className="col-7">
						<p className="">Inspiré par la 2ème plus grande île de l’archipel d’hawaï, le maui t’y fera voyager entre paysages verdoyants, saveurs à la fois fraîches et volcaniques.</p>
						<div className="row mt-5">
							<div className="col-6">
								<h4>Ingrédients</h4>
								<ul>
									<li> Base semoule</li>
									<li> Poiverons jaunes</li>
									<li> Radis</li>
									<li> Graine de courges</li>
									<li> Salade</li>
									<li> Sauce spéciale semoule</li>
								</ul>
							</div>
							<div className="col-6">
								<h4>Allergènes</h4>
								<p className="infoStyle">Aucun allergène renseignée pour cette recette ! Vous pourrez profiter tranquillement.</p>
							</div>
						</div>
					</div>
				</div>	
			</section>
		</>
	);
}
export default MealScreen;