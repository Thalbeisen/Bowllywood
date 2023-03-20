import './errorScreen.scss';
// import HeaderTitle from '../../components/HeaderTitle';
import { Link } from 'react-router-dom';

const ErrorScreen = ({errCode='', errText}) => {

	if (!errText)
	{
		errText = 'Une erreur inconnue est survenue. Veuillez recommencer ou retourner à la page d\'accueil.';
	}

	return (
		<div className="errorCntr d-flex flex-column justify-content-between px-3 py-4">	
			{/*<HeaderTitle />*/}
			<h1 className="thinTitle ps-5 ms-3">Bowllywood</h1>
			<div className="row flex-center">
				<div className="col-11 col-sm-7 col-md-6 col-lg-5 col-xxl-4" >
					<div className="textCntr flex-column flex-center align-self-center">
						<h2 className="mauikea_font text-center">Erreur {errCode}</h2>
						<p className="text-center">Pas de bowl ! {errText}</p>
					<Link to="/" className="homeLink flex-center text-decoration-none">
						<i className="fa-solid fa-house me-3" />
						<span>Retourner à la page d'accueil</span>
					</Link>

					</div>
				</div>
			</div>
			<span className="bottomSpan text-center">Excusez-nous pour la gêne occasionnée.</span>
		</div>
	)
}

export default ErrorScreen;