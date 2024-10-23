const mongoose = require('mongoose')
mongoose.set("strictQuery",true);
async function connectIt(url){
    return mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports ={connectIt}