var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    title: { type: String, required: true },
    short_desc: { type: String},
    file_size: { type: String },
    type: { type: String },
    modified: { type: String }
});

module.exports = db.model('File', FileSchema);