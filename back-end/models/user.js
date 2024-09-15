const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema ({
    firstName:{
        type:String, 
        required:true
    },
    lastName:{
        type:String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required:true
    },
    cart:{
        type:Array
    }
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)