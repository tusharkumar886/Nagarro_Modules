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
        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark as complete";
        complete_button.setAttribute("onclick", "completeAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    return todo_element;
}

function completeAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                print_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function getTodosAJAX() {

    //AJAX - XMLhttprequest object
    //make req to server
    //1. without reloading
    //2. asynchronous

    //xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);

    xhr.onreadystatechange = function () {
        //write code here that needs to be executed after response

        //has response been received
        if(xhr.readyState === RESPONSE_DONE){
            //is response ok?
            //Status code == 200
            if(xhr.status === STATUS_OK){

                print_todo_elements(TODOS_LIST_ID,xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    } //end of callback

    xhr.send(data = null);
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

                print_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
        }
    }

    xhr.send(data);
}