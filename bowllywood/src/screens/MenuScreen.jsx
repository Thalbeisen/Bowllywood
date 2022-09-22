import Carousel from 'react-bootstrap/Carousel';

// donnée en dure
import tereakiImg from '../assets/img/menu/sale/menu_tereaki.jpg';
import tahitiImg  from '../assets/img/menu/sale/menu_tahiti.jpg';
import pouletImg  from '../assets/img/menu/sale/menu_poulet.jpg';
import veggieImg  from '../assets/img/menu/sale/menu_veggie.jpg';

function Menu() {

return (
		<>
			<Carousel>
				<Carousel.Item>
					<div className="row align-items-center justify-content-center">
						<div className="col-2">
					        <img
					          className="d-block w-100"
					          src={tereakiImg}
					          alt="tereaki"
					        />
				          	<h3>Tereaki</h3>
						</div>
			          	<div className="col-2">
					        <img
					          className="d-block w-100"
					          src={tahitiImg}
					          alt="tereaki"
					        />
				          	<h3>Tahiti</h3>
						</div>
						<div className="col-2">
					        <img
					          className="d-block w-100"
					          src={pouletImg}
					          alt="tereaki"
					        />
				          	<h3>Poulet</h3>
						</div>
						<div className="col-2">
					        <img
					          className="d-block w-100"
					          src={veggieImg}
					          alt="tereaki"
					        />
				          	<h3>Veggie</h3>
						</div>
					</div>
			    </Carousel.Item>
			</Carousel>
		</>
	);
}

export default Menu;
