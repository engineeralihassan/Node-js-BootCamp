const express = require('express');
const fs = require('fs');
const Tour = require('../modals/tourModal');
const ApiFeatures = require('../utils/apiFeatures');

// ROUTE HANDLERS
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.feilds = 'name,price,ratingsAverage,difficulty,description';
  next();
};

exports.getAllTours = async (req, res) => {
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

exports.createTour = async (req, res) => {
  console.log('We are in the create tour function');
  try {
    console.log('We are in try block');
    const newTour = await Tour.create(req.body);
    console.log('We are in try block1');
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log('We are in the catch block');
    res.status(400).json({
      status: 'fail',
      message: 'Invalid request please check your passed data',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // let tour = await Tour.findOne({_id:req.params.id});
    let tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      results: 0,
      message: 'We could not found any thing against thid ID',
    });
  }
};

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
