var express = require( 'express' );
var {isUserValid, register} = require( '../controllers/auth' );
var router = express.Router();
var User = require( '../models/user' ); ``

router.post( '/login', function ( req, res, cb )
{
    if ( req.body.g_csrf_token && req.body.g_csrf_token == req.cookies.g_csrf_token )
    {
        const {OAuth2Client} = require( 'google-auth-library' );
        const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );
        async function verify()
        {
            const ticket = await client.verifyIdToken( {
                idToken: req.body.credential,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            } );
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log( userid );
            userobj = {name: payload['name'], email: payload['email']}
            User.findOne( {email: userobj.email}, ( err, collection ) =>
            {
                if ( collection && collection.length == 0 )
                {
                    var newuser = new User( userobj );
                    newuser.save();
                }
            } );

            req.session.user = {username: userobj.name};
            res.json( {success: true, name: userobj.name} );

            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }
        verify().catch( console.error );

    }
    else
    {
        isUserValid( {username: req.body.username, password: req.body.password}, ( obj ) =>
        {
            if ( obj.success )
            {
                req.session.user = {username: obj.name};
                console.log( req.session.user );
            }
            res.json( obj );
        } )
    }
} );
router.post( '/register', register );

router.get( '/logout', function ( req, res )
{
    req.session.destroy();
    res.json( {success: true} );
} );


module.exports = router;