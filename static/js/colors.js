function changeColor()
{
    var red=document.getElementById("redrange").value;
    var green=document.getElementById("greenrange").value;
    var blue = document.getElementById( "bluerange" ).value;
    
    document.getElementById( "reddisplay" ).innerHTML = red;
    document.getElementById( "greendisplay" ).innerHTML = green;
    document.getElementById( "bluedisplay" ).innerHTML = blue;

    document.getElementById( "colorbox" ).innerHTML = document.getElementById( "colorbox" ).style.backgroundColor = `rgb( ${red}, ${green}, ${blue} )`;   
}