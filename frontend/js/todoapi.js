function displayTodos()
{
    $.ajax( {
        url: `https://${window.location.host}/api/todos`,
        type: 'GET',
        success: function ( result )
        {
            result = JSON.parse( result );
            for ( let key = result.length - 1; key >= 0; key-- )
            {
                document.getElementById( "todos" ).innerHTML += `\n<div class="todo-item" id="div-${result[key].todoId}" ><label id="lbl-${result[key].todoId}" onclick="editTask(this)">${result[key].task}</label><button id="${result[key].todoId}" class="btn" onclick="deleteTask(this)">done</button></div>\n`
            }
        },
        error: function ( error )
        {
            console.log( error );
        }
    } );
}

function addTask()
{
    if ( event.keyCode != 13 )
        return;
    if ( document.getElementById( "input" ).value == "" )
        return;
    var data = {task: document.getElementById( "input" ).value, todoId: Date.now()};
    $.ajax( {
        url: `https://${window.location.host}/api/todos`,
        type: 'POST',
        data: data
    } );
    ele = document.getElementById( "todos" );
    ele.innerHTML = `\n<div class="todo-item" id="div-${data.todoId}" ><label id="lbl-${data.todoId}" onclick="editTask(this)">${data.task}</label><button id="${data.todoId}" class="btn" onclick="deleteTask(this)">done</button></div>\n` + ele.innerHTML;
    document.getElementById( "input" ).value = "";
}

function deleteTask( obj )
{
    var todoId = $( obj ).attr( 'id' );
    // /api/todos/:todoId
    $.ajax( {
        url: `https://${window.location.host}/api/todos/${todoId}`,
        method: "DELETE"
    } );
    document.getElementById( `div-${todoId}` ).remove();
}

function editTask( obj )
{
    var id = $( obj ).attr( 'id' );
    document.getElementById( id ).setAttribute( "contentEditable", "true" );
    $( `#${id}` ).keydown( function ( event )
    {
        if ( event.keyCode == 13 )
        {
            document.getElementById( id ).setAttribute( "contentEditable", "false" );
            var task = document.getElementById( id ).innerHTML;
            todoId = id.slice( 4 );
            var data = {task: task, todoId: todoId};
            $.ajax( {
                url: `https://${window.location.host}/api/todos/${todoId}`,
                type: 'PUT',
                data: data
            } );
        }
    } );
    $( `#${id}` ).focusout( function ( event )
    {
        document.getElementById( id ).setAttribute( "contentEditable", "false" );
        var task = document.getElementById( id ).innerHTML;
        todoId = id.slice( 4 );
        var data = {task: task, todoId: todoId};
        $.ajax( {
            url: `https://${window.location.host}/api/todos/${todoId}`,
            type: 'PUT',
            data: data
        } );
    } );
}