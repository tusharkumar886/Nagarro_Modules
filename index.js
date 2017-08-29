var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var todo_db = require("./seed.js");

app.listen(3000);

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
        todo_db.todos[todo_db.next_todo_id] = {
            title: req.body.todo_title,
            status: todo_db.StatusENUMS.ACTIVE
        };
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


// 5. Get all Active todos
app.get("/api/todos/active",function (req, res) {
    var todo_ACTIVE = {};
    console.log(todo_db.next_todo_id);
    for ( var i=1; i < todo_db.next_todo_id; i++ ) {
        if ( todo_db.todos[i].status === todo_db.StatusENUMS.ACTIVE ) {
            todo_ACTIVE[i]=todo_db.todos[i];
        }
    }
    res.json(todo_ACTIVE);
});

// 6. Get all Complete todos
app.get("/api/todos/complete",function (req, res) {
    var todo_ACTIVE = {};
    for ( var i=1; i < todo_db.next_todo_id; i++ ) {
        if ( todo_db.todos[i].status === todo_db.StatusENUMS.COMPLETE ) {
            todo_ACTIVE[i]=todo_db.todos[i];
        }
    }
    res.json(todo_ACTIVE);
});

// 7. Get all Deleted todos
app.get("/api/todos/deleted",function (req, res) {
    var todo_ACTIVE = {};
    for ( var i=1; i < todo_db.next_todo_id; i++ ) {
        if ( todo_db.todos[i].status === todo_db.StatusENUMS.DELETED ) {
            todo_ACTIVE[i]=todo_db.todos[i];
        }
    }
    res.json(todo_ACTIVE);
});

// 8. marks a todo as complete
app.post("/api/todos/complete/:id",function (req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];

    if(!todo){
        res.status(400).json({err:"Todo doesn't exist."});
    }else{
        todo_db.todos[mod_id].status = todo_db.StatusENUMS.COMPLETE;
    }
    res.json(todo_db.todos[mod_id]);
});

// 9. marks a todo as active
app.post("/api/todos/active/:id",function (req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];

    if(!todo){
        res.status(400).json({err:"Todo doesn't exist."});
    }else{
        todo_db.todos[mod_id].status = todo_db.StatusENUMS.ACTIVE;
    }
    res.json(todo_db.todos[mod_id]);
});
