const express= require('express');
const tourController= require('../controllers/tourControllers');

 



let router = express.Router();

router.param('id',(req,res,next,val)=>{
next();
});


// 5 best tours route alias
router.route('/top-best-tours').get(tourController.aliasTopTours,tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

  module.exports= router;
