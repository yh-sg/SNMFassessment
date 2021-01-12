const router = require("express").Router();
const fetch = require('node-fetch')
const withQuery = require('with-query').default

const URL = "https://api.vatcomply.com/currencies"
const URL2 = "https://api.vatcomply.com/rates"

//get all the currency symbols
router.get("/list",async(req,res)=>{
    let result = await fetch(URL)
    let jsResult = await result.json()
    return res.status(200).json(jsResult)
})

//get all the currency conversion rates from base
router.get("/rates",async(req,res)=>{
    const search = req.query['base']
    const url = withQuery(
        URL2,
        {
            base:search,
        }
    )
    // console.log(url)
    let result = await fetch(url)
    let jsResult = await result.json();
    // console.log(jsResult)
    return res.status(200).json(jsResult);
})

router.get("/ratesInfo",async(req,res)=>{
    const search = req.query['base']
    const date = req.query['date']
    const url = withQuery(
        URL2,
        {
            base:search,
            date:date
        }
    )
    // console.log(url)
    let result = await fetch(url)
    let jsResult = await result.json();
    // console.log(jsResult)
    return res.status(200).json(jsResult);
})

module.exports = router;