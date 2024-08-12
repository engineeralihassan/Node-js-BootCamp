const express= require('express');
const fs= require('fs');

let fileContent = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8');
let tours = JSON.parse(fileContent);

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
  
  exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour); // Add new tour to the array
  
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Error writing to file',
        });
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    });
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