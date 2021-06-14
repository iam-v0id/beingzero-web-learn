var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema( {
    name: {
        type: 'String',
        required: true,
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',

    },
    isDeleted: {
        type: 'boolean',
        default: false
    }
}, {timestamps: true} );

module.exports = mongoose.model( 'User', userSchema );