const express = require('express');

const router = express.Router();

// Controllers
const prospectsCtrl = require('../controllers/prospects');

router.post('/', prospectsCtrl.createProspectRequest);
// id de la demande
router.get('/:id', prospectsCtrl.getProspectRequestDetail);
// id de l'utilisateur (route à modifier et mettre dans le router de user)
router.get('/', prospectsCtrl.getAllProspectRequest);
// id de la demande
router.delete('/:id', prospectsCtrl.deleteProspectRequest);
// id de la demande
router.patch('/:id', prospectsCtrl.updateProspectRequest);
module.exports = router;
