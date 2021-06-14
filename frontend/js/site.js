if ( "user" in localStorage )
{
    $( '.notLoggedIn' ).hide();
    $( '.LoggedIn' ).show();
    $( '#user-dropdown' ).html( "Welcome, " + localStorage.getItem( "user" ) );
}
else
{
    $( '.notLoggedIn' ).show();
    $( '.LoggedIn' ).hide();
}


$( '#btn-login' ).click( function ()
{
    $.ajax( {
        url: '/auth/login',
        method: 'POST',
        data: {username: $( '#username' ).val(), password: $( '#password' ).val()},
        success: ( obj ) =>
        {
            if ( obj.success )
            {
                $( '.notLoggedIn' ).hide();
                $( '.LoggedIn' ).show();
                $( '#user-dropdown' ).html( "Welcome, " + obj.name );
                toastr.success( 'Login Sucessful' );
                localStorage.setItem( "user", obj.name );

            }
            else
            {
                toastr.error( 'Invalid username or password' );
            }

        },
        error: ( err ) =>   
        {
            console.log( err );
        }
    } );
} );

$( '#register-submit' ).click( function ()
{

    $.ajax( {
        url: '/auth/register',
        method: 'POST',
        data: {name: $( '#name' ).val(), password: $( '#password' ).val(), email: $( '#email' ).val()},
        success: ( obj ) =>
        {
            if ( obj.success )
            {

                toastr.success( 'Sucessfully Registered' );
            }

            window.location.replace( "/" );

        },
        error: ( err ) =>
        {
            console.log( err ); toastr.error( 'Something went Wrong' );
        }
    } );
} );

$( '#btn-logout ' ).click( () =>
{
    localStorage.clear();
    sessionStorage.clear();
    $.ajax( {
        url: '/auth/logout',
        method: 'GET',
        success: ( obj ) =>
        {
            if ( obj.success )
            {
                $( '.notLoggedIn' ).show();
                $( '.LoggedIn' ).hide();
            }
        },
        error: ( err ) =>
        {
            console.log( err ); toastr.error( 'Something went Wrong' );
        }
    } );


} );

$( '#btn-info' ).click( () =>
{

    $.ajax( {
        url: '/mail',
        method: 'GET',

        success: ( obj ) =>
        {
            if ( obj.success )
            {

                toastr.success( obj.email );
            }
            else
                toastr.error( 'You need to Login' );

        },
        error: ( err ) =>
        {
            console.log( err ); toastr.error( 'Something went Wrong' );
        }
    } );
} );


function onSignIn( obj )
{

    if ( obj.success )
    {
        $( '.notLoggedIn' ).hide();
        $( '.LoggedIn' ).show();
        $( '#user-dropdown' ).html( "Welcome, " + obj.name );
        toastr.success( 'Login Sucessful' );
        localStorage.setItem( "user", obj.name );

    }
    else
    {
        toastr.error( 'Invalid username or password' );
    }
}