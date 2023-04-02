import './maintenance.scss';
// import HeaderTitle from '../../components/HeaderTitle';
import { Link } from 'react-router-dom';

const Maintenance = () => {
	return (
		<div className="maintCntr d-flex flex-column justify-content-between px-3 py-4">	
			{/*<HeaderTitle />*/}
			<h1 className="ps-5 ms-3">Bowllywood</h1>
			<div className="row flex-center">
				<div className="col-11 col-sm-7 col-md-6 col-lg-5 col-xxl-4" >
					<div className="textCntr flex-column flex-center align-self-center">
						<h2 className="mauikea_font text-center">Page en maintenance</h2>
						<p className="text-justify">Cette page a mangé quelque chose et a fait une indigestion... Notre équipe s'efforce de l'osculter, et lui donne un bol de riz avec une pincée de créativité. Elle devra patienter un peu pour vous être à votre service !</p>
						<Link to="/" className="homeLink flex-center text-decoration-none" replace>
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

export default Maintenance;