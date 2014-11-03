// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
function toLower (v) {
           return v.toLowerCase();
        }
var UserSchema = new Schema({
    email: { type: String, required: true, set: toLower },
    username: { type: String, required: true, set: toLower },
    password: { type: String, required: true },
    role: { type: Number, required: true },//1.Admin 2.Investor 3.User
    image_path: { type: String },
    dob: { type: Date },
    status:{type:String},
    modified: { type: Date, default: Date.now },
    fileInfo: {        
        type: { type: String, default: ''},
        name: { type: String, default: ''},
        path: { type: String, default: ''},
        size: { type: Number , default:''}
    }
});
module.exports = db.model('User', UserSchema);