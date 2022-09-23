// 62c6dd067a81f4008c1a667c
import './MealScreen.scss';
import { useEffect, useState } from 'react';
import { getOneMeal } from '../../service/meal';
import HeaderTitle from '../../components/HeaderTitle';

const MealScreen = () => {

	const [bowl, setBowl] = useState(null);

	useEffect( () => {
		//  verifier si est bien de type objID ?
		getOneMeal().then((res) => {
			setBowl(res.data);
		}).catch((err) => {
			console.log(err);
		});
	}, [] );
	console.log(bowl);

	return (
		<>
			<HeaderTitle>{`Le ${bowl.name}`}</HeaderTitle>
			<section className="mealCtnr container-lg my-5">
				<div className="row text-start justify-content-center gap-5">
					<div className="imgCtnr col-4">
						<img src={`/menu/${bowl.image}`} alt={bowl.name} className="img-fluid"/>
					</div>
					<div className="col-7">
						<p>{bowl.description}</p>
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