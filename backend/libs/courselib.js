const coursemodel = require( '../models/coursemodel' );

module.exports.createcourse = function ( courseobj, callback )
{
    var course = new coursemodel( courseobj );
    course.save( function ( err, courseobj )
    {
        if ( err )
        {
            console.log( "err" + err );
        }
        else
        {
            callback( err, courseobj );
        }
    } );
}

module.exports.getallcourses = function ( callback )
{
    var query = {}
    coursemodel.find( query, function ( err, courseobj )
    {
        if ( err )
        {
            console.log( "err" + err );
        }
        else
        {
            callback( err, courseobj );
        }
    } );
}

module.exports.updatecourse = function ( id, options, callback )
{
    coursemodel.updateOne( {id: id}, {$set: options}, function ( err, courseobj )
    {
        if ( err )
        {
            console.log( "err" + err );
        }
        else
        {
            callback( err, courseobj );
        }
    } );

}

module.exports.deletecourse = function ( id, callback )
{
    coursemodel.deleteOne( {id: id}, function ( err, courseobj )
    {
        if ( err )
        {
            console.log( "err" + err );
        }
        else
        {
            callback( err, courseobj );
        }
    } );
}