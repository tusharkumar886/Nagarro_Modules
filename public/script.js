const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_id";
const NEW_TODO_TITLE = "new_todo_title";

window.onload = getTodosAJAX();

function print_todo_elements(id, todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if(parent){
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key,todos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;

    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class" , "todoStatus"+ todo_object.status + " " + "breathVertical");

    if (todo_object.status === "ACTIVE"){

            var complete_button = document.createElement("input");
            complete_button.innerText = "Mark as complete";
            complete_button.setAttribute("type","checkbox");
            complete_button.setAttribute("onchange", "completeAJAX("+id+")");
            complete_button.setAttribute("class", "breathHorizontal");
            todo_element.appendChild(complete_button);

            var remove_button = document.createElement("button");
            remove_button.innerText = "x";
            remove_button.setAttribute("onclick", "deleteAJAX("+id+")");
            remove_button.setAttribute("class", "breathHorizontal");
            todo_element.appendChild(remove_button);

    }else
    if (todo_object.status === "COMPLETE"){
        var active_button = document.createElement("input");
        active_button.setAttribute("type","checkbox");
        active_button.setAttribute("checked","true");
        active_button.setAttribute("onchange", "activeAJAX("+id+")");
        active_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(active_button);

        var delete_button = document.createElement("button");
        delete_button.innerText = "x";
        delete_button.setAttribute("onclick","deleteAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    return todo_element;
}

function activeAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                getTodosAJAX()
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function completeAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                getTodosAJAX()
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function deleteAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);

    xhr.onreadystatechange = function(){

        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                getTodosAJAX()
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}

function getTodosAJAX() {
    getTodosActiveAJAX();
    getTodosCompleteAJAX();
    getTodosDeletedAJAX();
}

function addTodoAJAX() {
    var todo_title = document.getElementById(NEW_TODO_TITLE).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "todo_title="+encodeURI(todo_title);

    xhr.onreadystatechange = function () {
        //write code here that needs to be executed after response

        //has response been received
        if (xhr.readyState === RESPONSE_DONE) {
            //is response ok?
            //Status code == 200
            if (xhr.status === STATUS_OK) {
                //console.log(xhr.responseText);

                getTodosAJAX()
            }
        }
    };

    xhr.send(data);
}

function getTodosActiveAJAX() {

    //AJAX - XMLhttprequest object
    //make req to server
    //1. without reloading
    //2. asynchronous

    //xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/active",true);

    xhr.onreadystatechange = function () {
        //write code here that needs to be executed after response

        //has response been received
        if(xhr.readyState === RESPONSE_DONE){
            //is response ok?
            //Status code == 200
            if(xhr.status === STATUS_OK){

                print_todo_elements("todos_list_active",xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }; //end of callback

    xhr.send(data = null);
}

function getTodosCompleteAJAX() {

    //AJAX - XMLhttprequest object
    //make req to server
    //1. without reloading
    //2. asynchronous

    //xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/complete",true);

    xhr.onreadystatechange = function () {
        //write code here that needs to be executed after response

        //has response been received
        if(xhr.readyState === RESPONSE_DONE){
            //is response ok?
            //Status code == 200
            if(xhr.status === STATUS_OK){

                print_todo_elements("todos_list_complete",xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }; //end of callback

    xhr.send(data = null);
}

function getTodosDeletedAJAX() {

    //AJAX - XMLhttprequest object
    //make req to server
    //1. without reloading
    //2. asynchronous

    //xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/deleted",true);

    xhr.onreadystatechange = function () {
        //write code here that needs to be executed after response

        //has response been received
        if(xhr.readyState === RESPONSE_DONE){
            //is response ok?
            //Status code == 200
            if(xhr.status === STATUS_OK){

                print_todo_elements("todos_list_deleted",xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }; //end of callback

    xhr.send(data = null);
}