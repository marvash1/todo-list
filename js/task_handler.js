//  Inherits from TaskList
//  Manages several task operations
function TaskHandler() {
    TaskList.call(this);
}

TaskHandler.prototype = Object.create(TaskList.prototype);
TaskHandler.prototype.constructor = TaskList;

TaskHandler.prototype.reset = function () {
    this.splice(0, this.length);
}

//  Tasks have to be unique. Adding a duplicate will return an error (0)
TaskHandler.prototype.addTask = function (text) {
    var index = this.indexOfTask(text);
    if (index > -1)
        return 0;
    else {
        task = new Task(text);
        this.push(task);
        return 1;
    }
}

TaskHandler.prototype.deleteTask = function (text) {
    var index = this.indexOfTask(text);
    if (index > -1) {
        this.splice(index, 1);
        return 1;
    }
    else
        return 0; 
}

TaskHandler.prototype.markTask = function (text) {
    var index = this.indexOfTask(text);
    if (index > -1)
        this[index].marked = true;
    else
        return 0;
}

TaskHandler.prototype.unmarkTask = function (text) {
    var index = this.indexOfTask(text);
    if (index > -1)
        this[index].marked = false;
    else
        return 0;
}

TaskHandler.prototype.renameTask = function (text, newText) {
    var index = this.indexOfTask(text);
    if (index > -1)
        this[index].rename(newText);
    else
        return 0;
}

TaskHandler.prototype.getTaskCompletion = function () {
    var markedTasks = this.getMarked().length;
    var totalTasks = this.length;
    if(markedTasks === 0)
        return "0 %";
    else
        return Number((markedTasks / totalTasks) * 100).toFixed(1) + " %";
}