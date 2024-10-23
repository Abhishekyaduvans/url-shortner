const express = require('express')
const app = express();
const urlRoute= require('./routes/url')
const {connectIt} = require('./connection') 
const URL = require('./models/url')
const PORT = 8000;
// console.log("bnaa bhi le kucch")
connectIt('mongodb://localhost:27017/short-url')
.then(()=>{
    console.log("connected")
})
app.use(express.json())
app.use('/url',urlRoute)

app.get ('/:shortid',async(req,res)=>{
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        {
        shortId
    },
    {
        $push:{
        visitHistory: 
        {
            timestamp:Date.now(),
        },
       }
    }  
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>
    {
        console.log(`server is running babe! :- ${PORT}`)
    })
