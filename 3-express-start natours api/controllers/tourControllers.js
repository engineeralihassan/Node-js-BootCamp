const express = require('express');
const fs = require('fs');
const Tour = require('../modals/tourModal');
const ApiFeatures = require('../utils/apiFeatures');
const CatchAsync= require('../utils/catchAsync');
const AppError = require('../utils/appError');

// ROUTE HANDLERS
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.feilds = 'name,price,ratingsAverage,difficulty,description';
  next();
};

// CatchAsync Function in Node




exports.getAllTours =  async (req, res) => {
  try {
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allTours = await features.query;
    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: {
        tours: allTours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      results: 0,
      message: 'Something went wrong while feching data please try again',
    });
  }
};

exports.createTour = CatchAsync( async (req, res) => {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  
});

exports.getTour = CatchAsync( async (req, res) => {
    let tour = await Tour.findById(req.params.id);
    if(!tour){
      console.log("did not found tour");
      return next( new AppError('Did not found any record on this request',404));
    }
    console.log("")
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  }) ;

exports.updateTour = async (req, res) => {
  try {
    let tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      results: 0,
      message:
        'Your body data is not according to the settle validations in db',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    let tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      results: 0,
      message: 'we did not fund any record againt this id',
    });
  }
};

// Agregation piplines in mongoDB

exports.getTourStats= async(req,res)=>{
   try {
const stats= await Tour.aggregate([
{
  $match : {ratingsAverage:{ $gte:4.5}}
},{
  $group : {
    // _id:'$difficulty',
    _id:{$toUpper: '$difficulty'},
    sumn:{$sum:1},
    aveRatings: {$avg : '$ratingsAverage'},
    aveprice: {$avg : '$price'},
    minPrice: {$min : '$price'},
  }
},
{
  $sort:{ aveprice:1}
},
{
$match:{_id :{$ne:'EASY'}

}
}
]);

res.status(200).json({
  status: 'success',
  results: stats.length,
  data: {
    stats,
  },
});
    
   } catch (error) {
    res.status(500).json({
      status: 'fail',
      results: 0,
      message: 'Something went wrong',
    });
   }
}


exports.getMonthlyPlan= async(req,res)=>{
  try {
    let year= req.params.year*1;
    console.log("Year is:",year);
    let plan = await Tour.aggregate([
      {
        $unwind : '$startDates'
      },{
        $match : {
           startDates:{
            $gte:new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
           }
        }
      },
      {
        $group :{
          _id:{$month : '$startDates'},
          numTourStarts:{$sum:1},
          tours:{$push: '$name'}
        }
      },
      {
        $addFields:{ month:'$_id'}
      },
      {
        $project : { _id:0 }
      },
      {
        $sort : { numTourStarts:-1}
      }
    ])
    res.status(200).json({
      status: 'success',
      results: plan.length,
      data: {
        plan,
      },
    }); 
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      results: 0,
      message: 'Something went wrong',
    });
  }
}
