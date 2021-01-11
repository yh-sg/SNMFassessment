const mongoose = require("mongoose");

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
        comment: {
            type: String,
        },
        filename:{
            type: String,
            // require: true
        },
        exchangeCreatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
        { timestamps: true }
    );

const Transacation = mongoose.model("Transaction", transactionSchema);
module.exports = Transacation;