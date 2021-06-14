var User = require( '../models/user' );


module.exports.isUserValid = function ( obj, cb )
{

    User.findOne( {name: obj.username}, ( err, userobj ) =>
    {
        if ( err )
            cb( err );
        if ( userobj && userobj.password === obj.password )
            cb( {success: true, name: obj.username} );
        else
            cb( {success: false} );
    } );
}

module.exports.register = function ( req, res )
{
    var user = new User( {name: req.body.name, email: req.body.email, password: req.body.password} );
    user.save();
    res.json( {success: true} );
}

