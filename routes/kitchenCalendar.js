const express = require('express');

const router = express.Router();

const kitchenCalendarController = require('../controllers/kitchenCalendar');

router.post('/add', kitchenCalendarController.addNewEvent);

router.get('/', kitchenCalendarController.getAllEvents);

router.patch('/edit/:eventID', kitchenCalendarController.eventEdit);

router.delete('/delete/:eventID', kitchenCalendarController.eventDelete);

module.exports = router;
