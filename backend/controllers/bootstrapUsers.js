var User = require( '../models/user' );

module.exports.create = function ()
{
    if ( User.find( {}, ( err, collection ) =>
    {
        if ( collection.length == 0 )
        {
            User.create( {name: 'admin', email: 'admin@gmail.com', password: 'admin'} );
            User.create( {name: 'user', email: 'user@gmail.com', password: 'user'} );
            console.log( 'Users Created' );
        }
        else
        {
            console.log( 'Users Already Created' );
        }
    } ) );
};