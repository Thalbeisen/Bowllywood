import './MenuScreen.scss';
import { useEffect, useState } from 'react';
import { getAllMeal } from '../../service/meal';
import HeaderTitle from '../../components/HeaderTitle';

// donnée en dure
import tereakiImg from '../../assets/img/menu/sale/tereakiWeb.jpg';
import tahitiImg  from '../../assets/img/menu/sale/tahitiWeb.jpg';
import veggieImg  from '../../assets/img/menu/sale/veggieWeb.jpg';

function MenuScreen() {	
	const [menu, setMenu] = useState([]);
	useEffect( () => {
		getAllMeal().then((res) => {
			setMenu(res.data);
		}).catch((err) => {
			console.log(err);
		});
	}, [] );
	console.log(menu);

return (
	<>
		<HeaderTitle />
		<section className="menuCtnr container">
			<div className="row align-items-center justify-content-center gap-3">
			<div className="col-2">
				<div className="d-flex flex-column flex-center">
					<div className="imgCtnr">
				        <img
				          src={tereakiImg}
				          alt="tereaki bowl"
			    	    />
					</div>
	          		<h3>Tereaki</h3>
	          	</div>
			</div>
	      	<div className="col-2">
	      		<div className="d-flex flex-column flex-center">
					<div className="imgCtnr">
				        <img
				          src={tahitiImg}
				          alt="tahiti bowl"
			    	    />
		        	</div>  	
		        	<h3>Tahiti</h3>
		        </div>
			</div>
			<div className="col-2">
				<div className="d-flex flex-column flex-center">
					<div className="imgCtnr">
				        <img
				          src='/menu/sale/pouletWeb.jpg'
				          alt="poulet bowl"
			    	    />
		        	</div>  	
		        	<h3>Poulet</h3>
		        </div>
			</div>
			<div className="col-2">
				<div className="d-flex flex-column flex-center">
					<div className="imgCtnr">
				        <img
				          src={veggieImg}
				          alt="veggie bowl"
			    	    />
		        	</div>  	
		        	<h3>Veggie</h3>
		        </div>
			</div>
			</div>
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
