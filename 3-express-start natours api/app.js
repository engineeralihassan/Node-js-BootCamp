const express = require('express');
const fs = require('fs');
const app = express();

// MIDDLE WARE IN NODE JS
// Middle ware is the simple function in which we modify the request
app.use(express.json());
const port = 3000;
let fileContent = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8');
let tours = JSON.parse(fileContent);

// app.get('/',(req,res)=>{
//     res.status(200).send("Hello from the server side in express");
// })
// // post Method in the API
// app.post('/',(req,res)=>{
//     res.status(200).send("Hello from the server in the post method");
// })

// Make some URLS according to the REST structure

app.get('/api/v1/tours', (req, res) => {
  console.log('re');
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// POST REUESTS

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err, data) => {
      if (err) {
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //  res.send('Done');
});

// Read PARAMS FROM URL

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'success',
      message: 'No Record found againt this Id',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
});

app.listen(port, () => {
  console.log('Hello this is the app running on port');
});
