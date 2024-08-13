const mongoose= require('mongoose');
const fs= require('fs');
const dotenv= require('dotenv');
const Tour = require('../../modals/tourModal');
dotenv.config({
    path:'../../config.env'    
    });
    const DB= process.env.DATABASE;
    mongoose.connect(DB).then((connection)=>{
        console.log("connection is build succefully");
    });
let toursString= fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8');
let tours= JSON.parse(toursString);

// IMPORT DATA INTO DB
const importData = async () => {
    try {
      await Tour.create(tours);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }

