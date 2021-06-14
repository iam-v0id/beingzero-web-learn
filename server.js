require( 'dotenv' ).config();

var User = require( './backend/models/user' );
const express = require( "express" );
const course = require( "./backend/controllers/course" );
const db = require( "./backend/db/connect" );
const config = require( "./backend/config/config" );
var authRouter = require( './backend/routes/auth' );
var session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );
const app = express();

db.connect();

app.listen( config.webPort, function ()
{
    console.log( 'Server started at  http://localhost:' + config.webPort )
} );

app.use( logger( 'dev' ) );
app.use( express.static( __dirname + '/frontend' ) );
app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );
app.use( cookieParser() );
app.use( session( {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create( {mongoUrl: process.env.MONGO_CONNECTION_STRING} )
} ) );

app.get( "/", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/index.html" );
} );

app.get( "/resume", function ( req, res )
{
    res.sendFile( __dirname + '/frontend/html/resume.html' );
} );

app.get( "/google", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/googlesearch.html" );
} );

app.get( "/colors", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/colors.html" );
} );
app.get( "/login", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/login.html" );
} );

app.get( "/register", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/register.html" );
} );
app.get( "/test", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/test.html" );
} );

app.get( "/todo", function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/todoapi.html" );
} );


var todos = [];

app.get( '/api/todos', function ( req, res )
{
    // Get all todos
    res.send( JSON.stringify( todos ) );
} );

app.get( '/api/todos/:todoId', function ( req, res )
{
    // req.params.todoId
    // get single todo with given id

    for ( let i = 0; i < todos.length; i++ )
    {
        if ( todos[i].todoId == req.params.todoId )
            res.send( todos[i] );
    }
    res.sendStatus( 404 );
} );

app.put( '/api/todos/:todoId', function ( req, res )
{
    // update
    for ( let i = 0; i < todos.length; i++ )
    {
        if ( todos[i].todoId == req.params.todoId )
        {
            todos[i] = req.body;
            return;
        }
    }
    todos.push( req.body );
} );

app.delete( '/api/todos/:todoId', function ( req, res )
{
    // delete
    for ( let i = 0; i < todos.length; i++ )
    {
        if ( todos[i].todoId == req.params.todoId )
        {
            todos.splice( i, 1 );
            res.sendStatus( 200 );
            return;
        }
    }
    res.sendStatus( 404 );
} );


app.post( '/api/todos', function ( req, res )
{
    // Create
    // req.body will have what frontend sent
    todos.push( req.body );
} );

app.get( '/crud', function ( req, res )
{
    res.sendFile( __dirname + '/frontend/html/crud.html' );
} );


app.get( '/api/crud', function ( req, res )
{
    course.getallcourses( function ( err, courseobj )
    {
        res.json( courseobj );
    } );
} );

app.put( '/api/crud/:id', function ( req, res )
{
    req.body.Articels = parseInt( req.body.Articels );
    console.log( "Got PUT Req" );
    course.updatecourse( req.params.id, req.body, function ( err, courseobj )
    {
        if ( err )
            console.log( err );

        res.json( courseobj );
    } );
} );

app.delete( '/api/crud/:id', function ( req, res )
{
    console.log( req.params.id );
    course.deletecourse( req.params.id, function ( err, courseobj )
    {
        res.json( courseobj );
    } )
} );

app.post( '/api/crud', function ( req, res )
{
    course.createcourse( req.body );
    res.redirect( "/crud" );
} );

app.get( '/tambola', function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/tambola.html" );
} );

app.get( '/register', function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/register.html" )
} );


app.post( '/dashboard', function ( req, res )
{
    res.sendFile( __dirname + "/frontend/html/dashboard.html" )
} );

app.use( '/auth', authRouter );


app.use( '/mail', ( req, res ) =>
{
    if ( req.session && req.session.user )
    {
        var username = req.session.user.username;
        User.findOne( {name: username}, ( err, userobj ) =>
        {
            if ( err )
                res.send( err );
            if ( userobj )
                res.json( {success: true, email: userobj.email} );
            else
                res.json( {success: false} );
        } );

    }
    else
        res.json( {success: false} );
} );