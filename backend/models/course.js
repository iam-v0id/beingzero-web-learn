const mongoose = require( 'mongoose' );
var courseSchema = new mongoose.Schema( {
    name: String,
    Articels: Number,
    isDeleted: Boolean,
    id: Number
} );


module.exports = mongoose.model( 'course', courseSchema );