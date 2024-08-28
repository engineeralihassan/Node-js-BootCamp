const express = require('express');
const tourController = require('../controllers/tourControllers');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();



router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect,
    authController.restrictTo('user'),
    // reviewController.setTourUserIds,
    reviewController.createReview
  );

module.exports=router;