$( document ).ready( function ()
{
    $( "button.btn" ).click( function ()
    {
        var id = $( this ).attr( 'id' );
        console.log( id );
    } );
} );

function addButton()
{
    document.getElementById( "ss" ).innerHTML += "<button>rem</button>";
}