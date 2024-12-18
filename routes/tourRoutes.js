const express = require('express')
const router = express.Router();
const TourController = require('../controllers/tourController')


router.route('/').get(TourController.getAllTours).post(TourController.createTour)

router.route('/:id').get(TourController.getTour).patch(TourController.updateTour).delete(TourController.deleteTour)

module.exports = router;