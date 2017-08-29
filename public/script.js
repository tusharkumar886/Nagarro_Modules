console.log("script file loaded");

const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_id";

function add_todo_elements(id, todos_data_json) {
    var parent = document.getElementById(id);
    parent.innerText = todos_data_json;
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
                console.log(xhr.responseText);

                add_todo_elements(TODOS_LIST_ID,xhr.responseText);
            }
        }
    }//end of callback

    xhr.send(data = null);
}