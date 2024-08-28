const Review= require('../modals/reviewModel');
const User = require('../modals/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews=  catchAsync(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(201).json({
      status: 'success',
      data: {
        data: reviews
      }
    });
  });

exports.createReview=  catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newReview
      }
    });
  });