const mongoose = require("mongoose");
const moment = require('moment')

let today = new Date();
today.setHours(today.getHours()+8).toString()

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            require: true,
        },
        symbol: {
            type: String,
            require: true,
        },
        convertedAmt: {
            type: Number,
            require: true,
        },
        filename:{
            type: String,
            // require: true
        },
        createdDate: {
            type: Date,
            default: today
          },
        buySell: {
            type: String,
            require: true,
        },
        exchangeCreatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
        { timestamps: true }
    );

    // transactionSchema.methods.date = function () {
    //     return moment(this.createdDate).format("MMMM Do YYYY");
    // };

const Transacation = mongoose.model("Transaction", transactionSchema);
module.exports = Transacation;