const express = require('express');
const fs = require('fs');
const Tour = require('../modals/tourModal');

let fileContent = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`,
  'utf8'
);
let tours = JSON.parse(fileContent);

// Middle wares

// exports.checkBody= (req,res,next)=>{
//     if(!req.body.name || !req.body.price){
//       return  res.status(400).json({
//             status:'fail',
//             message:'we are missing somethings from prive or name of the tour'
//         })
//     }
//     next();
// };

// ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    //  let allTours = await Tour.find({difficulty:'easy'});
    // let allTours = await Tour.find({difficulty:'easy'});  // filtering one way in mongoDb
    // let allTours = await Tour.find().where('difficulty').equals('easy').where('duration').lte(5);
   let queryObj= {...req.query};
   excludedFields=['limit','page','feilds','sort'];
   console.log("query objecr real",queryObj);
   excludedFields.forEach(element =>  delete queryObj[element]);
   console.log("query objecr final",queryObj);
    let allTours = await Tour.find(queryObj);
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

exports.getTour = async(req, res) => {
  try {
    // let tour = await Tour.findOne({_id:req.params.id});
    let tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour
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

exports.updateTour = async(req, res) => {
  try {
    let tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators
      :true
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
      message: 'Your body data is not according to the settle validations in db',
    });
  }
};

exports.deleteTour = async(req, res) => {
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
