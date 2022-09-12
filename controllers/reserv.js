//////////////// CONTROLLER //////////////////
const Reserv = require('../models/reserv');
const errors = require('../conf/errors');
const entity = 'RESERV'.

/**
 * Create a reservation
 * @param  {Request} req
 * @param  {Response} res         Use res.status 201 & 500.
 *
 * Une fois créé, redirection vers page confirmation
 */
exports.createReserv = async (req, res) => {
	try 
	{
		const newReserv = await new Reserv({...req.body}).save();

		// traitement
		res.status(201).json(newReserv);
	}
	catch (err)
	{
		res.status(400).json(errors.createError(entity));
	}
}

/**
 * Update a Reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.updateReserv = async (req, res) => {
	try 
	{
		const updatedReserv = await Reserv.findByIdAndUpdate(
			req.params.id,
			{
				...resq.body,
			}
		);

		res.status(200).json(updatedReserv);
	}
	catch (err)
	{
		res.status(500).json(err.message);

		res.status(403).json(errors.updateError);
	}
}

exports.deleteReserv = async (req, res) => {
	try 
	{
		
		// throw 
		res.status(200).json(stock);
	}
	catch (err)
	{
		res.status(500).json(err.message);
	}
}

getAllEntité
createEntité[Colonne] 
getOneQqch 
updateReserv
deleteEntité
