function InputManager() {
    this.events = {};
    this.listen();
}

InputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
}

InputManager.prototype.emit = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
}

InputManager.prototype.listen = function () {
    this.bindButton("#add-task", this.addTask);
    this.bindButton("#delete-task", this.deleteTasks);
    this.bindButton("#reset", this.reset);

    this.bindEnter("#add-task", this.addTask.bind(this));
    $('#text-container').focus();
}

InputManager.prototype.addTask = function () {
    this.emit("addTask");
}

InputManager.prototype.deleteTasks = function () {
    this.emit("deleteTask");
}

InputManager.prototype.reset = function () {
    this.emit("reset");
}

InputManager.prototype.bindButton = function (selector, fn) {
    $(selector).click(fn.bind(this));
}

InputManager.prototype.bindEnter = function (selector, fn) {
    $(document).keypress(function (e) {
        if (e.which == 13) {
            fn();
        }
    });
}