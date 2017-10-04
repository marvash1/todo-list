//glue everything
function TodoList(Interface, EventManager, TaskHandler) {
    this.interface = new Interface;
    this.eventManager = new EventManager;
    this.taskHandler = new TaskHandler;

    // BUTTON EVENT DELEGATION
    this.eventManager.on("addTask", this.addTask.bind(this));
    this.eventManager.on("deleteTask", this.deleteTask.bind(this));
    this.eventManager.on("reset", this.reset.bind(this));

    this.MAX = 10; //task max range
}

TodoList.prototype.addTask = function () {
    var text = this.interface.extractText();
    if (!text) return;
    if(this.taskHandler.length >= this.MAX) return; 
    var flag = this.taskHandler.addTask(text);
    if (flag) {
        this.interface.addTask(text);
        this.interface.update(this.taskHandler);
        //BOOTSTRAP CLASSES
        $('a:last-child').addClass('list-group-item border-primary');
        $('a:last-child').find('label').addClass('float-right');
    }
}

TodoList.prototype.deleteTask = function () {
    var self = this;
    var $checked = this.interface.getCheckedTasks();
    var text = [];

    $checked.each(function () {
        text.push($(this).text());
    });

    text.forEach(function (elem) {
        self.taskHandler.deleteTask(elem);
    });

    this.interface.update(this.taskHandler);
    this.interface.deleteTask();
}

TodoList.prototype.reset = function () {   
    this.taskHandler.reset();
    this.interface.reset();
    this.interface.update(this.taskHandler);
}