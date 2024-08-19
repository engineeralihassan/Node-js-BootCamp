const express= require('express');
const fs= require('fs');
const { signUp,login,forgetPassword,resetPassword } = require('../controllers/authenticationController');

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

router.post('/signup',signUp);
router.post('/login',login);
router.post('/rest-password/:token',resetPassword);
router.post('/forget-password',forgetPassword);

  router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  module.exports= router;
