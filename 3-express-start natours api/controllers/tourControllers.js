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


exports.aliasTopTours=(req,res,next)=>{
  console.log("In the top middle ware");
req.query.limit='5';
req.query.sort="-ratingsAverage,price";
req.query.feilds='name,price,ratingsAverage,difficulty,description';
next();
}



exports.getAllTours = async (req, res) => {
  try {
    //  let allTours = await Tour.find({difficulty:'easy'});
    // let allTours = await Tour.find({difficulty:'easy'});  // filtering one way in mongoDb
    // let allTours = await Tour.find().where('difficulty').equals('easy').where('duration').lte(5);
   let queryObj= {...req.query};
   excludedFields=['limit','page','feilds','sort'];
   excludedFields.forEach(element =>  delete queryObj[element]);
     // 1B) Advanced filtering
     let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
     console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));


// Sorting 

   if(req.query.sort){
    let sortBY= req.query.sort.split(',').join(' ');
    console.log(sortBY);
    query= query.sort(sortBY);
   }else{
    query= query.sort('-createdAt')
   }
 
  //  Feilds Limiting

  if(req.query.feilds){
    let feilds= req.query.feilds.split(',').join(' ');
    query= query.select(feilds);
   }else{
    query= query.select('-__v')
   }

  //  Paginations

  const limit= req.query.limit*1 || 5;
  const page= req.query.page*1 || 1;
  const skip= (page-1)*limit;
  query=query.skip(skip).limit(limit);

  if(req.query.page){
    let numRecords= await Tour.countDocuments();
    if(skip>numRecords){
      throw new Error('This page data is not exsist')
    }
  }

    let allTours = await query;
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
