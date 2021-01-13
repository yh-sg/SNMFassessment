require("dotenv").config();
const mongoose = require("mongoose");
//connect to mongoose

mongoose.Promise = Promise;

mongoose.connect(
  process.env.MONGODB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("mongodb connected!");
  }).catch((e)=> {
    console.log(e);
  });
  // (err) => {
  //   if (err) throw err;
  //   console.log("mongodb connected!");
  // }
;
module.exports = mongoose;