const express= require('express');
const fs= require('fs');
const Tour=require('../modals/tourModal')

let fileContent = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8');
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
exports.getAllTours = (req, res) => {
    console.log('Fetching all tours');
    res.status(200).json({
      status: 'success',
      results: tours.length,
      isFromMiddleware:req.isFromMiddleware,
      data: {
        tours,
      },
    });
  };
  
  exports.createTour = async  (req, res) => {
    console.log("We are in the create tour function");
   try {
    console.log("We are in try block");
   const  newTour= await  Tour.create(req.body);
    console.log("We are in try block1");
    res.status(200).json({
      status:'success',
      data:{
        tour:newTour
      }
    })
   } catch (error) {
    console.log("We are in the catch block");
    res.status(400).json({
      status:'fail',
      message:'Invalid request please check your passed data'
    })
   }
  };
  
  exports.getTour = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tour = tours.find(el => el.id === id);
  
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'No record found with this ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  };
  
  exports.updateTour = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tourIndex = tours.findIndex(el => el.id === id);
  
    if (tourIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'No record found with this ID',
      });
    }
  
    // Here you would update the tour in the array and write to file
    // For simplicity, I'm not implementing the update logic
  
    res.status(200).json({
      status: 'success',
      data: {
        record: '< updated record is here>',
      },
    });
  };
  
  exports.deleteTour = (req, res) => {
      console.log("Delete record start");
    const id = parseInt(req.params.id, 10);
    const tourIndex = tours.findIndex(el => el.id === id);
  
    if (tourIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'No record found with this ID',
      });
    }
  
    tours.splice(tourIndex, 1); // Remove the tour from the array
  
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Error writing to file',
        });
      }
      res.status(204).json({
        status: 'success',
        data: null,
      });
    });
  };