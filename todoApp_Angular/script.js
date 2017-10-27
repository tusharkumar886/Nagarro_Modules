var statusType;
(function (statusType) {
    statusType[statusType["Active"] = 0] = "Active";
    statusType[statusType["Completed"] = 1] = "Completed";
    statusType[statusType["Deleted"] = 2] = "Deleted";
})(statusType || (statusType = {}));
;
var todoList = /** @class */ (function () {
    function todoList() {
        this.names = [];
        this.status = [];
    }
    todoList.prototype.add = function (todo) {
        this.names.push(todo.name);
        this.status.push(todo.status);
    };
    todoList.prototype.delete = function (id) {
        this.status[id] = statusType.Deleted;
    };
    todoList.prototype.complete = function (id) {
        this.status[id] = statusType.Completed;
    };
    todoList.prototype.active = function (id) {
        this.status[id] = statusType.Active;
    };
    return todoList;
}());
var todos = new todoList();
function addTodo(name, status) {
    todos.add({
        name: name,
        status: status
    });
    return todos;
}
function deleteTodoItem(id) {
    todos.delete(id);
}
function completeTodoItem(id) {
    todos.complete(id);
}
function activeTodoItem(id) {
    todos.active(id);
}
