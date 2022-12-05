// 62c6dd067a81f4008c1a667c
import './MealScreen.scss';
import { useEffect, useState } from 'react';
// import * as React from 'react';
import { getOneMeal } from '../../services/meal';
import { useParams } from 'react-router-dom';
import HeaderTitle from '../../components/HeaderTitle';

let errMessage="Une erreur est survenue. Le plat a été supprimé ou s'est enfuit du restaurant...",
errTitle="Erreur ! ";

const MealScreen = () => {

	const [bowl, setBowl] = useState(null);
	const {id} = useParams();

	useEffect( () => {
		//  verifier si est bien de type objID ?
		getOneMeal(id).then((res) =>{
			setBowl(res.data);
		}).catch((err) => {
			// pas récupérés
			errTitle = `Erreur ! (${err.code})`; 
			errMessage = err.response.data;
		});
	}, [id] );

	const Rendering = () => {
		if (bowl == null || typeof bowl != 'object')
		{
			return (
				<div className="col-7">
					<p className="p-0">{errMessage}</p>
					<a href="/menu" className="greenlink">En attendant, consultez nos autres plats !</a>
				</div>
			)
		}
		else
		{
			return (
				<>
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
				</>
			)
		}
	}

	return (
		<>
			<HeaderTitle>{ (bowl == null || typeof bowl != 'object') ? errTitle : `Le ${bowl.name}` }</HeaderTitle>
			<section className="mealCtnr container-lg my-5">
				<div className="row text-start justify-content-center gap-5">
					<Rendering/>
				</div>	
			</section>
		</>
	);

}
export default MealScreen;