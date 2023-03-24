import './MealScreen.scss';
import { useEffect, useState } from 'react';
import { getOneMeal } from '../../services/meal';
import { useParams } from 'react-router-dom';
import HeaderTitle from '../../components/HeaderTitle';
import { Oval } from 'react-loader-spinner';
import { errorHandler } from '../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';

let decodedTokens;

const MealScreen = () => {
	const [bowl, setBowl] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [isConnected, setIsConnected] = useState(false);

	const {id} = useParams(),
		  navigate = useNavigate();

	useEffect( () => {
		//  verifier si est bien de type objID ?
		getOneMeal(id).then((res) =>{
			setBowl(res.data);
		}).catch((err) => {
			errorHandler('REDIRECT', err, navigate)
		}).finally(()=>{
			setLoaded(true)
		});;

		decodedTokens = JSON.parse(localStorage.getItem('userTokens'));
    	setIsConnected((decodedTokens.token) ? true : false);
	}, [id, decodedTokens] );

	const Rendering = () => {
		return (
			<>
			<div className="imgCtnr col-4">
				<img src={`/menu/${bowl?.image}`} alt={bowl?.name} className="img-fluid"/>
			</div>
			<div className="col-7">
				<p>{bowl?.description}</p>
				<h2>{bowl?.price}</h2>
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

	return (
		<>
			<HeaderTitle>{ (!loaded) ? 'Chargement du bowl' : `Le ${bowl?.name}` }</HeaderTitle>
			{
				(isConnected && loaded)
				? <div className="d-flex justify-content-center">
					<a href={`/menus/edit/${bowl?._id}`} className="addLink d-flex align-items-center">
						<i className="fa-solid fa-circle-plus me-3"></i>
						Modifier le bowl
					</a>
				</div>
				: ''
			}
			<section className="mealCtnr container-lg my-5">
				<div className="row text-start justify-content-center gap-5">
					{
						(loaded) 
						? <Rendering /> 
						: <span className='col-1 mt-5'>
							<Oval
								strokeWidth="5"
								strokeWidthSecondary="5"
								secondaryColor="#000"
								height="25"
								width="25"
								radius="9"
								color="#CECECE"
								ariaLabel="loading"
								wrapperStyle
							/>
						</span>
					}
				</div>	
			</section>
		</>
	);

}
export default MealScreen;