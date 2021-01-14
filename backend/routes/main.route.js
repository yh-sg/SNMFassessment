require('dotenv').config();
const router = require("express").Router();
const Transacation = require("../model/transaction.model");
const AWS = require('aws-sdk')
const multer = require('multer');
const fs = require('fs')
const checkToken = require("../config/config");
const mongoose = require("mongoose")

const AWS_S3_HOSTNAME = process.env.AWS_S3_HOSTNAME;
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
const AWS_S3_SECRET_ASSESSKEY = process.env.AWS_S3_SECRET_ASSESSKEY;
const AWS_S3_BUCKETNAME = process.env.AWS_S3_BUCKETNAME;

const spaceEndPoint = new AWS.Endpoint(AWS_S3_HOSTNAME);

const s3 = new AWS.S3({
    endpoint: spaceEndPoint,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_ASSESSKEY,
});

const upload = multer({
    dest: process.env.TMP_DIR || '/Users/yh/Desktop/NUS/SNMF/SNMF-assessment/temp'
})

router.post("/", upload.single('filename'), async (req, res) => {
try {
  res.on('finish', () => {
		fs.unlink(req.file.path, () => { })
	})

	fs.readFile(req.file.path,async(err, imgFile)=>{
        const params = {
            Bucket: AWS_S3_BUCKETNAME,
            Key: req.file.filename, 
            Body: imgFile,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
            ContentLength: req.file.size
		}
		
	s3.putObject(params, (err, result)=>{
		
  })

    let transaction = new Transacation({
      amount: req.body.amount,
      symbol: req.body.symbol,
      convertedAmt: req.body.convertedAmt,
      comment: req.body.comment,
      buySell: req.body.buySell,
      lat: req.body.lat,
      lon: req.body.lon,
      filename: req.file.filename,
      // exchangeCreatedBy: req.user.id
      exchangeCreatedBy: req.body.exchangeCreatedBy
    });
    // transaction.exchangeCreatedBy = req.user.id; 
    let savedTransaction = await transaction.save();

    res.status(201).json({
      message: "Data Created",
    });
})
} catch (error) {
       res.status(500).json({
        message: "Create data fail",
        statuscode: "Error 500",
      });
  }
});

router.get("/:id", async (req, res) => {
  try {

    // let transactions = await Transacation.find();
    // // let filter = transactions.filter((f)=> f.exchangeCreatedBy.toString() === req.user.id);
    // let filter = transactions.filter((f)=> f.exchangeCreatedBy.toString() === req.params.id);
    //     // console.log(req.user.id)
    //     // console.log(transactions)
    //     // console.log(filter)
    // res.status(200).send({
    //   count: filter.length,
    //   transactions: filter,
    //   // transactions
    // });


    let transactions = await Transacation.aggregate([
      {
        $match: {'exchangeCreatedBy': {$in:[mongoose.Types.ObjectId(req.params.id)]}} 
      }
    ]);

    res.status(200).send({
      transactions
    });

  } catch (err) {
      res.status(500).json({
        message: "Error SHOWALL transaction",
      });
    }
  });

  router.get("/transaction/:id", async (req, res) => {
    try {
      let transaction = await Transacation.findById(req.params.id);
  
      res.status(200).json({
        transaction
      });
    } catch (err) {
      res.status(500).json({
        message: "error SHOWONE transaction",
      });
    }
  });

  // router.delete("/delTransaction/:id", async (req, res) => {
  //   try {
  //     let folderDelete = await Folder.findByIdAndDelete(req.params.id);
  
  //     if (folderDelete) {
  //       res.status(200).json({
  //         message: "Deleted transaction",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Failed to delete transaction",
  //     });
  //   }
  // });

module.exports = router;