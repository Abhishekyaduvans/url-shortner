const mongoose = require('mongoose')
mongoose.set("strictQuery",true);
async function connectIt(url){
    return mongoose.connect(url)
}

module.exports ={connectIt}