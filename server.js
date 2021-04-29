const express = require( "express" );
const app = express();

const PORT = process.env.PORT || 3000;

app.listen( PORT, function ()
{
    console.log( 'Server started on Port : ' + PORT )
} );

app.use( express.static( 'static' ) );

app.get("/home",function (req,res) {
    res.sendFile( __dirname + "/static/html/home.html" );
})

