const express = require( "express" );
const app = express();

const PORT = process.env.PORT || 3000;

app.listen( PORT, function ()
{
    console.log( 'Server started at  http://localhost:' + PORT )
} );

app.use( express.static( __dirname + '/static' ) );

app.use( express.json() );

app.use(express.urlencoded({extended: true}));

app.get( "/", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/index.html" );
} );

app.get( "/resume", function ( req, res )
{
    res.sendFile( __dirname + '/static/html/resume.html' );
} );

app.get( "/google", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/googlesearch.html" );
} );

app.get( "/colors", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/colors.html" );
} );
app.get( "/login", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/login.html" );
} );

app.get( "/register", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/register.html" );
} );

app.get( "/todo", function ( req, res )
{
    res.sendFile( __dirname + "/static/html/todoapi.html" );
} );


var todos = [{todoId:123,task:"do nothing"},{todoId:13,task:"wow"}];

app.get( '/api/todos', function ( req, res )
{
    // Get all todos
    res.send(JSON.stringify(todos));
} );

app.get( '/api/todos/:todoId', function ( req, res )
{
    // req.params.todoId
    // get single todo with given id
    for ( let i = 0; i < todos.length; i++ )
    {
        if ( todos[i].todoId === req.params.todoId )
            res.send(todos[i]);
    }
    res.sendStatus(404);
} );

app.put( '/api/todos/:todoId', function ( req, res )
{
    // update
    for ( let i = 0; i < todos.length; i++ )
    {
        if ( todos[i].todoId === req.params.todoId )
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
        if ( todos[i].todoId === req.params.todoId )
        {
            todos.splice( i );
            res.sendStatus( 200 );
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