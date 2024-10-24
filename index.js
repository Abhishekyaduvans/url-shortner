const express = require('express')
const app = express();
const path = require('path');
const urlRoute= require('./routes/url')
const {connectIt} = require('./connection')
const  staticRoute= require('./routes/staticRouter')
const URL = require('./models/url')
const PORT = 8000;
// console.log("bnaa bhi le kucch")
connectIt('mongodb://localhost:27017/short-url')
.then(()=>{
    console.log("connected")
})

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',staticRoute);

app.use('/url',urlRoute)

app.get ('/url/:shortid',async(req,res)=>{
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
    if(entry)
    {
    res.redirect(entry.redirectURL);
    }
})
app.listen(PORT,()=>
    {
        console.log(`server is running babe! :- ${PORT}`)
    })
