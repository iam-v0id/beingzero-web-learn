function fillTodos()
{
    var ele = document.getElementById( "block" );
    console.log( window );
    //const xhr = new XMLHttpRequest();
    //console.log( xhr );
    // xhr.open( "GET", `https://${window.location.host}/api/todos`, true );
    // xhr.onload = function ()
    // {
    //     obj = JSON.parse( this.responseText );
    //     console.log(obj);
    //     for ( key in obj )
    //     {
    //         console.log(key);
    //         ele.innerHTML += `<div class="flex">${obj[key].task}<button>del</button><div>`;
    //     }
    // }
    // xhr.send();
    $.ajax( {
        url: `https://${window.location.host}/api/todos`,
        type: 'GET',
        success: function ( result )
        {
            console.log(result);
        },
        error: function ( error )
        {
            console.log(error);
        }
    } );
}