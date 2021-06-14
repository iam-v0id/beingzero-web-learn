const coursemodel = require( '../models/course' );

module.exports.createcourse = function ( courseobj )
{
    var newcourse = new coursemodel( courseobj );
    newcourse.save();
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
    var options = {isDeleted: true};
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