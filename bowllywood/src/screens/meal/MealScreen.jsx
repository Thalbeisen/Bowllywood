import './MealScreen.scss';
import { useEffect, useState } from 'react';
import { getOneMeal } from '../../services/meal';
import { useParams } from 'react-router-dom';
import HeaderTitle from '../../components/HeaderTitle';
import { Oval } from 'react-loader-spinner';

const MealScreen = () => {
	const [bowl, setBowl] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [isConnected, setIsConnected] = useState(true); //false
	// si connecté, alors setIsConnected(true)

	const [errMsg, setErrMsg] = useState({
		title: 'Erreur !',
		message: 'Une erreur est survenue. Le plat a été supprimé ou s\'est enfuit du restaurant...'
	});
	const {id} = useParams();

	useEffect( () => {
		//  verifier si est bien de type objID ?
		getOneMeal(id).then((res) =>{
			setBowl(res.data);
			console.log(res.data)
		}).catch((err) => {
			setErrMsg({
				title: `Erreur ! (${err.code})`,
				message: err.response.data
			})
		}).finally(()=>{
			setLoaded(true)
		});;
	}, [id] );

	const Rendering = () => {
		if (bowl == null || typeof bowl != 'object')
		{
			return (
				<div className="col-7">
					<p className="p-0">{errMsg.message}</p>
					<a href="/menu" className="greenlink">En attendant, consultez nos autres plats !</a>
				</div>
			)
		}
		else
		{
			// setEditLink(`${bowl_id}`)
			return (
				<>
				<div className="imgCtnr col-4">
					<img src={`/menu/${bowl.image}`} alt={bowl.name} className="img-fluid"/>
				</div>
				<div className="col-7">
					<p>{bowl.description}</p>
					<h2>{bowl.price}</h2>
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
			<HeaderTitle>{ (bowl == null || typeof bowl != 'object') ? errMsg.title : `Le ${bowl.name}` }</HeaderTitle>
			{
				(isConnected && loaded)
				? <div class="d-flex justify-content-center">
					<a href={`/menus/edit/${bowl._id}`} className="addLink d-flex align-items-center">
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
								wrapperClass
							/>
						</span>
					}
				</div>	
			</section>
		</>
	);

}
export default MealScreen;