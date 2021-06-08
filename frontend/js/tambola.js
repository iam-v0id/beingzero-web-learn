var marked = [];


async function wait( ms )
{
    return new Promise( resolve =>
    {
        setTimeout( resolve, ms );
    } );
}
var generate = async () =>
{
    if ( marked.length == 100 )
    {
        alert( 'Game Over' );
        return;
    }
    document.getElementById( "previous" ).innerHTML = document.getElementById( "display" ).innerHTML;
    document.getElementById( "display" ).style.color = "black";
    for ( let i = 0; i < 15; i++ )
    {
        var number = Math.ceil( Math.random() * 100 );
        document.getElementById( "display" ).innerHTML = number;
        await wait( 150 );
    }
    document.getElementById( "display" ).style.color = "blue";
    var number = Math.ceil( Math.random() * 100 );
    while ( marked.indexOf( number ) != -1 )
    {
        var number = Math.ceil( Math.random() * 100 );
    }
    marked.push( number );
    document.getElementById( "display" ).innerHTML = number;
    for ( let i = 0; i < 50; i++ )
    {
        var el = document.getElementById( 'display' );
        var style = window.getComputedStyle( el, null ).getPropertyValue( 'font-size' );
        var fontSize = parseFloat( style );
        el.style.fontSize = ( fontSize + 2 ) + 'px';
        await wait( 8 );
    }
    await wait( 100 );
    for ( let i = 0; i < 50; i++ )
    {
        var el = document.getElementById( 'display' );
        var style = window.getComputedStyle( el, null ).getPropertyValue( 'font-size' );
        var fontSize = parseFloat( style );
        el.style.fontSize = ( fontSize - 2 ) + 'px';
        await wait( 8 );
    }

    document.getElementById( `cell${number}` ).innerHTML = number;
}