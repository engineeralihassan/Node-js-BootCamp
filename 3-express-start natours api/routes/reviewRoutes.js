const express = require('express');
const tourController = require('../controllers/tourControllers');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({mergeParams:true});



router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  ).patch(reviewController.updateReview);

  router.route("/:id").delete(reviewController.deleteReview).get(reviewController.getReview)

module.exports=router;