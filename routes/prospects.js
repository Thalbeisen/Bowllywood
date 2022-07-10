const express = require('express');

const router = express.Router();

// Controllers
const prospectsCtrl = require('../controllers/prospects');

router.post('/', prospectsCtrl.createProspectRequest);
// id de la demande
router.get('/:id', prospectsCtrl.getProspectRequestDetail);
router.get('/', prospectsCtrl.getAllProspectRequest);
// id de la demande
router.delete('/:id', prospectsCtrl.deleteProspectRequest);
// id de la demande
router.patch('/:id', prospectsCtrl.updateProspectRequest);
module.exports = router;
