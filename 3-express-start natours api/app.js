// const express = require('express');
// const fs = require('fs');
// const app = express();

// // MIDDLE WARE IN NODE JS
// // Middle ware is the simple function in which we modify the request
// app.use(express.json());
// const port = 3000;
// let fileContent = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8');
// let tours = JSON.parse(fileContent);

// // app.get('/',(req,res)=>{
// //     res.status(200).send("Hello from the server side in express");
// // })
// // // post Method in the API
// // app.post('/',(req,res)=>{
// //     res.status(200).send("Hello from the server in the post method");
// // })

// // Make some URLS according to the REST structure

// // app.get('/api/v1/tours', (req, res) => {
// //   console.log('re');
// //   res.status(200).json({
// //     status: 'success',
// //     results: tours.length,
// //     data: {
// //       tours,
// //     },
// //   });
// // });

// // POST REUESTS

// // app.post('/api/v1/tours', (req, res) => {
// //   // console.log(req.body);
// //   let newId = tours[tours.length - 1].id + 1;
// //   let newTour = Object.assign({ id: newId }, req.body);
// //   fs.writeFile(
// //     './dev-data/data/tours-simple.json',
// //     JSON.stringify(tours),
// //     (err, data) => {
// //       if (err) {
// //         return;
// //       }
// //       res.status(200).json({
// //         status: 'success',
// //         data: {
// //           tour: newTour,
// //         },
// //       });
// //     }
// //   );
// //   //  res.send('Done');
// // });

// // Read PARAMS FROM URL

// // app.get('/api/v1/tours/:id', (req, res) => {
// //   console.log(req.params);
// //   const id = req.params.id * 1;
// //   const tour = tours.find((el) => el.id === id);

// //   if (!tour) {
// //     res.status(404).json({
// //       status: 'success',
// //       message: 'No Record found againt this Id',
// //     });
// //   } else {
// //     res.status(200).json({
// //       status: 'success',
// //       data: {
// //         tour,
// //       },
// //     });
// //   }
// // });

// // PUT OR PATH | UPDATE THE DATA

// // app.patch('/api/v1/tours/:id', (req, res) => {
// //   res.status(200).json({
// //     status: 'success',
// //     data: {
// //       record: '< updated record is here>',
// //     },
// //   });
// // });

// // DELETE A RECORD

// // app.delete('/api/v1/tours/:id', (req, res) => {
// //     res.status(200).json({
// //       status: 'success',
// //       data: {
// //         record: null,
// //       },
// //     });
// //   });
  
//   // BETTER VERSIONINGS OF THE ROUTES

//   const getAllTours= (req, res) => {
//     console.log('re');
//     res.status(200).json({
//       status: 'success',
//       results: tours.length,
//       data: {
//         tours,
//       },
//     });
//   }
//   const createTour= (req, res) => {
//     let newId = tours[tours.length - 1].id + 1;
//     let newTour = Object.assign({ id: newId }, req.body);
//     fs.writeFile(
//       './dev-data/data/tours-simple.json',
//       JSON.stringify(tours),
//       (err, data) => {
//         if (err) {
//           return;
//         }
//         res.status(200).json({
//           status: 'success',
//           data: {
//             tour: newTour,
//           },
//         });
//       }
//     );
//     //  res.send('Done');
//   }
// const getTour=  (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find((el) => el.id === id);
  
//     if (!tour) {
//       res.status(404).json({
//         status: 'success',
//         message: 'No Record found againt this Id',
//       });
//     } else {
//       res.status(200).json({
//         status: 'success',
//         data: {
//           tour,
//         },
//       });
//     }
//   }

//   const deleteTour= (req, res) => {
//     res.status(200).json({
//       status: 'success',
//       data: {
//         record: null,
//       },
//     });
//   }

//   const updateTour= (req, res) => {
//     res.status(200).json({
//       status: 'success',
//       data: {
//         record: '< updated record is here>',
//       },
//     });
//   }



// //   app.get('/api/v1/tours',getAllTours);
// //   app.get('/api/v1/tours/:id',getTour);
// //   app.patch('/api/v1/tours/:id',updateTour);
// //   app.delete('/api/v1/tours/:id',deleteTour);


// // LET iNRTODUCE THE ROUTES IN NODE JS 

// app.route('api/v1/tours').get(getAllTours).post(createTour);
// app.route('api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);


// app.listen(port, () => {
//   console.log('Hello this is the app running on port');
// });



// Middle wares Routes and Request Cylce

const express = require('express');
const morgan= require('morgan');
const fs = require('fs');
const app = express();

// Middleware to parse JSON bodies
// _____________ CUSTOME MIDDLEWARE ___________

app.use(express.json());
app.use(morgan('dev'))

app.use((req,res,next)=>{
    console.log("Hello from the Middle ware");
    req.isFromMiddleware=true;
    next();
})

const port = 3000;

// Load tours from file
let fileContent = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8');
let tours = JSON.parse(fileContent);

// Handler functions
const getAllTours = (req, res) => {
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

const createTour = (req, res) => {
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

const getTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// USER HANDLER FUNCTIONS

const getAllUsers=(req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'Route does not implemented yet',
      });
}

const createUser=(req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'Route does not implemented yet',
      });
}

const getUser=(req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'Route does not implemented yet',
      });
}

const updateUser=(req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'Route does not implemented yet',
      });
}

const deleteUser=(req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'Route does not implemented yet',
      });
}

// Define routes
app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  // Users Routes

  app.route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app.route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Start server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

