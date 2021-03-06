const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

//load env vars
dotenv.config({ path: './config/config.env' });


//Load models
const Bootcamp = require('./models/Bootcamp');


//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  //Read JSON Files
  const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));


  //Import into DB
  const importData = async () =>{
      try {
            await Bootcamp.create(bootcamps);

            console.log('Data imported...');
            process.exit();
      } catch (err) {
          console.error(err);
      }
  }

  //Delete Data
  const deleteData = async () =>{
    try {
          await Bootcamp.deleteMany();

          console.log('Data Destroyed...');
          process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }