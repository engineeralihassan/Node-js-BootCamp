const Review= require('../modals/reviewModel');
const User = require('../modals/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory= require('../controllers/handlerFactory')



// exports.getAllReviews=  catchAsync(async (req, res, next) => {
//   let filter;
//   if(req.params.tourId) filter= {tour:req.params.tourId}
//     const reviews = await Review.find(filter);

//     res.status(201).json({
//       status: 'success',
//       data: {
//         data: reviews
//       }
//     });
//   });
  exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };

  exports.getAllReviews= factory.getAll(User);
exports.getReview=  factory.getOne(Review);
exports.createReview=  factory.createOne(Review);
  exports.deleteReview=factory.deleteOne(Review);

  exports.updateReview=factory.updateOne(Review);