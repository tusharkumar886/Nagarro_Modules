var newTodo = document.getElementById("newTodo");
var addTodoButton = document.getElementById("addTodo");
var todoActiveList = document.getElementById("todo_active_list");
var todoCompetedList = document.getElementById("todo_complete_list");
var todoDeletedList = document.getElementById("todo_delete_list");

window.onload = function () {
    if(localStorage.getItem('todoList')){
        let list = JSON.parse(localStorage.getItem('todoList'));
        for(let i=0;i<list.names.length;i++){
            addTodo(list.names[i],list.status[i]);
        }
    }else{
        console.log(todos);
        localStorage.setItem('todoList',JSON.stringify(todos));
    }
    displayTodo();
}

addTodoButton.onclick = function () {
    //todos = JSON.parse(localStorage.getItem('todoList'));
    console.log(todos);
    addTodo(newTodo.value,statusType.Active);

    saveTodo();
    displayTodo();
}

function saveTodo() {
    localStorage.setItem('todoList',JSON.stringify(todos));
}

function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todoList'));
    todos.status[id] = statusType.Deleted;
    //console.log(todos);
    deleteTodoItem(id);
    localStorage.setItem('todoList',JSON.stringify(todos));
    displayTodo();
}


function completeTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todoList'));
    todos.status[id] = statusType.Completed;
    //console.log(todos);
    completeTodoItem(id);
    localStorage.setItem('todoList',JSON.stringify(todos));
    displayTodo();
}

function activeTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todoList'));
    todos.status[id] = statusType.Active;
    //console.log(todos);
    activeTodoItem(id);
    localStorage.setItem('todoList',JSON.stringify(todos));
    displayTodo();
}

function displayTodo(){
    todoActiveList.innerHTML = "";
    todoCompetedList.innerHTML="";
    todoDeletedList.innerHTML ="";

    let todoListStorage = JSON.parse(localStorage.getItem('todoList'));

    for(let i=0;i<todoListStorage.names.length;i++) {
        let todoName = document.createElement('li');
        todoName.setAttribute("id", "" + i + "");
        todoName.innerText = todoListStorage.names[i];

        if (todoListStorage.status[i] === statusType.Active){
            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('onclick', "deleteTodo("+i+")");
            deleteButton.setAttribute("class","glyphicon glyphicon-remove");


            let completeButton = document.createElement("input");
            completeButton.setAttribute("type", "checkbox");
            completeButton.setAttribute("style","float:left;");
            completeButton.setAttribute("onchange", "completeTodo("+i+")");

            todoName.appendChild(completeButton);
            todoName.appendChild(deleteButton);

            todoActiveList.appendChild(todoName);
            todoActiveList.appendChild(document.createElement("br"));
        }else {
            if(todoListStorage.status[i]===statusType.Completed){
                let active_button = document.createElement("input");
                active_button.setAttribute("type","checkbox");
                active_button.setAttribute("checked","true");
                active_button.setAttribute("style","float:left;");
                active_button.setAttribute("onchange", "activeTodo("+i+")");

                let delete_button = document.createElement("button");
                delete_button.setAttribute("onclick","deleteTodo("+i+")");
                delete_button.setAttribute("class","glyphicon glyphicon-trash");

                todoName.appendChild(active_button);
                todoName.appendChild(delete_button);

                todoCompetedList.appendChild(todoName);
                todoCompetedList.appendChild(document.createElement("br"));
            }
            else {
                todoDeletedList.append(todoName);
                todoDeletedList.appendChild(document.createElement("br"));
            }
        }
    }
    
}