import './AdminListMeals.scss';
import { useEffect, useState } from 'react';
import { getAllBowls } from '../../services/meal';
import { getAllUsers } from '../../services/users';

import HeaderTitle from '../../components/HeaderTitle';
import Button from '../../components/Button';
import { Col, Row, Container } from 'react-bootstrap';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, color } from '@mui/material/';

function AdminMealsScreen() {

	const [bowls, setBowls] = useState([]);
	
	useEffect( () => {
		getAllBowls().then((bowlRes) => {

			// set user filters
			let usersID = [];
			bowlRes.data.map((bowl, index) => {
				if (bowl.createdBy !== undefined) // && !filters.includes(bowl.createdBy)
				{
					usersID.push(bowl.createdBy)
				}
			});
			
			// get users's names
			const filters = (usersID.lentgh !== 0) ? `_id=${usersID}` : null ;
			getAllUsers(filters).then((userRes) => {
				console.log(userRes);
				let users = userRes.data.data;
				
				users.map((user, index)=>{
					// chopper un id direct
				})
			}).catch((err) => {
				console.log(err);
			})

			// res.data.createdBy =
			setBowls(bowlRes.data);

		}).catch((err) => {
			console.log(err);
		});
	}, [] );

	const onOpenDetailsDialog = () => {

	}

	const onOpenDeleteDialog = () => {

	}

// template for the list
const MealTemp = ({ bowl }) => {
	return (
		<li className="col-12 col-sm-4 col-xl-3 align-items-center">
{/*{`/menus/${bowl._id}`}*/}
			<Card>

				<CardHeader
					title={bowl.name}
					subheader={`Créé le ${new Date(bowl.createdAt).toLocaleDateString()} par ${bowl.createdBy ?? 'Créateur inconnu'}`}
				/>

				<CardMedia
					component="img"
					alt={bowl.name}
					image={`/menu/${bowl.image}`}
				/>

				<CardContent>
					<Row className="justify-content-between px-4">
						<Col xs="5">
							<Typography variant="h5">{bowl.price}</Typography>
						</Col>
						<Col xs="5">
							<Typography variant="h5" align="right">{(bowl.category === 'SALE') ? 'Salé' : 'Sucré' }</Typography>
						</Col>
					</Row>
					<Typography variant="body1" color="text.secondary">{bowl.description}</Typography>
				</CardContent>

				<CardActions>
					<Button className="no-border" onClick={onOpenDetailsDialog}>
						<i className="fa-regular fa-pen-to-square"></i>
					</Button>
					<Button className="no-border" onClick={onOpenDeleteDialog}>
						<i className="fa-solid fa-square-minus"></i>
					</Button>
				</CardActions>
			</Card>
		</li>
	)
}

// check if the list est empty or not, and return the adapted rendering.
const ListRendering = () => {
	if (bowls.length !== 0) {
		return (
			bowls.map((meal, index) => (
				<MealTemp key={index} bowl={meal}/>
			))
		)
	} else {
		return (
			<li className="col-12">
				<p className='infoText text-center'>Oups ! Aucun bowls n'a été trouvé...</p>
			</li>
		)
	}
}

return (
	<>
		<HeaderTitle>Les bowls</HeaderTitle>
		<Container className="adminListCtnr">
			<Row className="justify-content-center">
				<Col lg="11" xl="10">
					<ul className="row justify-content-evenly">
						{
							<ListRendering />
						}
					</ul>
				</Col>
			</Row>
		</Container>
		{/*<Dialog selectedValue="true"></Dialog>*/}
	</>
	);
}

export default AdminMealsScreen;
