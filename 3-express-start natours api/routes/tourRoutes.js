const express= require('express');
const tourController= require('../controllers/tourControllers');

 



let router = express.Router();

router.param('id',(req,res,next,val)=>{
next();
});




router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody,tourController.createTour);

router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

  module.exports= router;
