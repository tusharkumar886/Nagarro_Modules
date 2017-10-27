

enum statusType  {Active, Completed, Deleted};

interface todo{
    name:string
    status:statusType
}

class todoList{
    names:string[];
    status:statusType[];

    public constructor(){
        this.names = [];
        this.status = [];
    }

    add(todo:todo){
        this.names.push(todo.name);
        this.status.push(todo.status);
    }

    delete(id:number){
        this.status[id] = statusType.Deleted;
    }

    complete(id:number){
        this.status[id] = statusType.Completed;
    }

    active(id:number){
        this.status[id] = statusType.Active;
    }
}

var todos = new todoList();

function addTodo(name:string,status:statusType){
    todos.add({
        name : name,
        status : status
    });
    return todos;
}

function deleteTodoItem(id:number) {
    todos.delete(id);
}

function completeTodoItem(id:number){
    todos.complete(id);
}

function activeTodoItem(id:number){
    todos.active(id);
}