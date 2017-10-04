//  Array subclassing
function TaskList () {
    Array.call(this);
}

//  standard pseudo-classical inheritance
TaskList.prototype = Object.create(Array.prototype);
TaskList.prototype.constructor = Array;

//  implementing new methods
TaskList.prototype.getMarked = function () {
    return this.filter(function (task) {return task.marked });
}

TaskList.prototype.getPending = function () {
    return this.filter(function (task) {return !task.marked });
}

TaskList.prototype.indexOfTask = function (text) {
    return this.map(function (task) {return task.text}).indexOf(text);
}

TaskList.prototype.getTask = function (text) {
    var index = this.indexOfTask(text);
    return this[index];
}



//  NOTE: Tasks are unique (key : Task.text)

/* 
TaskList.prototype.indexOfTask = function (task, property) {
    if (task.hasOwnProperty(property))
        return this.map(function (task) {return task[property]}).indexOf(task[property]);
    else 
        return 1;
} 
*/
