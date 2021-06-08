function addTask()
{
    if(event.keyCode == 13) {
        var task = document.getElementById( "input" ).value;
        if ( task != "" )
        {
            var ele = document.getElementById( "block" );
            if ( localStorage.length == 0 )
            {
                var todos = [];
                todos.push( task );
                localStorage.setItem( "todos", JSON.stringify( todos ) );
            }
            else
            {
                var todos = JSON.parse( localStorage.getItem( "todos" ) );
                todos.push( task );
                localStorage.setItem( "todos", JSON.stringify( todos ) );
            }
            console.log(localStorage);
            ele.innerHTML = "<div><button onclick=\"remove(this)\">done</button><label>" + task + "</label></div>" + ele.innerHTML;
            document.getElementById( "input" ).value = "";
        }
    }
}

function fillTasks()
{
    var ele = document.getElementById( "block" );
    var todos = JSON.parse( localStorage.getItem( "todos" ) );
    for ( var task of todos )
    {
        ele.innerHTML = "<div><button onclick=\"remove(this)\">done</button><label>" + task + "</label></div>" + ele.innerHTML;
    }
}

function remove(x)
{
    var task = x.nextSibling.innerHTML;
    var todos = JSON.parse( localStorage.getItem( "todos" ) );
    var index = todos.indexOf(task);
    if ( index !== -1 )
    {
        todos.splice(index, 1);
    }
    localStorage.setItem( "todos", JSON.stringify( todos ) );
    x.parentElement.remove();
    console.log(localStorage);
}