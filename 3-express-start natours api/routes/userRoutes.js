const express= require('express');
const fs= require('fs');

let fileContent = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8');
let tours = JSON.parse(fileContent);


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

const router= express.Router();
  router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  module.exports= router;
