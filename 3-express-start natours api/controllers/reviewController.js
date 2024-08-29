const Review= require('../modals/reviewModel');
const User = require('../modals/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews=  catchAsync(async (req, res, next) => {
  let filter;
  if(req.params.tourId) filter= {tour:req.params.tourId}
    const reviews = await Review.find(filter);

    res.status(201).json({
      status: 'success',
      data: {
        data: reviews
      }
    });
  });

exports.createReview=  catchAsync(async (req, res, next) => {
  console.log("tour id is:",req.params.tourId,"params",req.params)
  if(!req.body.tour) req.body.tour=req.params.tourId;
  if(!req.body.user) req.body.user= req.user.id;
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newReview
      }
    });
  });