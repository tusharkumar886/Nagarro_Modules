var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var todo_db = require("./seed.js");

app.use("/",express.static(__dirname+"/public"));

app.use("/",function (req, res,next) {
    console.log("Request");
    console.log(req.url);
    console.log(req.method);

    next();
});

app.use("/",bodyParser.urlencoded({extended:false}));


//API part of the server
// 1. Get all todos
app.get("/api/todos",function (req, res) {
    res.json(todo_db.todos);
});

// 2. Delete a todo of particular id
app.delete("/api/todos/:id",function (req, res) {

    var id_to_be_deleted = req.params.id;
    var todo = todo_db.todos[id_to_be_deleted];

    if(!todo){
        res.status(400).json({err:"Todo doesn't exist."});
    }else {
        todo.status = todo_db.StatusENUMS.DELETED;
        res.json(todo);
    }
});


// 3. Add a new todo
app.post("/api/todos",function (req, res) {
    var todo = req.body.todo_title;
    if(!todo || todo ==="" || todo.trim() ===""){
        res.status(400).json({err:"Todo title can't be empty"});

    }else {
        var new_todo = {
            title : req.body.todo_title,
            status : todo_db.StatusENUMS.ACTIVE
        };
        todo_db.todos[todo_db.next_todo_id] = new_todo;
        todo_db.next_todo_id = todo_db.next_todo_id + 1;
    }
    res.json.print(todo_db.todos);
});

// 4. Update existing
app.put("/api/todos/:id",function (req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];

    if(!todo){
        res.status(400).json({err:"Todo title can't be empty"});

    }else {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title !== "" && todo_title.trim()!==""){
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if(todo_status &&
            (todo_status === todo_db.StatusENUMS.ACTIVE ||
            todo_status === todo_db.StatusENUMS.COMPLETE)){
            todo.status = todo_status;
        }
        res.json(todo_db.todos);
    }
});


app.listen(3000);





