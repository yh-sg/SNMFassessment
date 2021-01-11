require('dotenv').config();
const router = require("express").Router();
const Transacation = require("../model/transaction.model");
const AWS = require('aws-sdk')
const multer = require('multer');
const fs = require('fs')
const checkToken = require("../config/config");

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

// router.post("/", upload.single('filename'), async (req, res) => {
  router.post("/", async (req, res) => {
try {
  // res.on('finish', () => {
	// 	fs.unlink(req.file.path, () => { })
	// })

	// fs.readFile(req.file.path,async(err, imgFile)=>{
  //       const params = {
  //           Bucket: AWS_S3_BUCKETNAME,
  //           Key: req.file.filename, 
  //           Body: imgFile,
  //           ACL: 'public-read',
  //           ContentType: req.file.mimetype,
  //           ContentLength: req.file.size
	// 	}
		
	// s3.putObject(params, (err, result)=>{
		
  // })

    let transaction = new Transacation({
      amount: req.body.amount,
      symbol: req.body.symbol,
      convertedAmt: req.body.convertedAmt,
      comment: req.body.comment,
      // filename: req.file.filename,
      // exchangeCreatedBy: req.user.id
      exchangeCreatedBy: req.body.exchangeCreatedBy
    });
    // transaction.exchangeCreatedBy = req.user.id; 
    let savedTransaction = await transaction.save();

    res.status(201).json({
      message: "Data Created",
    });
// })
} catch (error) {
       res.status(500).json({
        message: "Create data fail",
        statuscode: "Error 500",
      });
  }
});

module.exports = router;