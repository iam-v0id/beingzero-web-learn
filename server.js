const express = require( "express" );
const app = express();

const PORT = process.env.PORT || 3000;

app.listen( PORT, function ()
{
    console.log( 'Server started at  http://localhost:' + PORT )
} );

app.use( express.static( __dirname+'/static' ) );

app.get( "/", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/index.html" );
} );

app.get( "/resume", function ( req, res ){
    res.sendFile( __dirname + '/static/html/resume.html' );
} );

app.get("/google",function (req,res) {
    res.sendFile( __dirname + "/static/html/googlesearch.html" );
} )

app.get("/colors",function (req,res) {
    res.sendFile( __dirname + "/static/html/colors.html" );
})