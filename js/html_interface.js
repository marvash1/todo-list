function HTMLInterface() {
    this.$textContainer = $("#text-container");         //INPUT
    this.$list = $("#list");                            //OUTPUT
    
    this.$pendingWork = $("#pending-work");             //INFO
    this.$taskCompletion = $("#completion");      
    
    this.clearTextContainer(); //flush
}

HTMLInterface.prototype.addTask = function (text) {
    this.appendRow(text);
    this.clearTextContainer();
}

HTMLInterface.prototype.deleteTask = function () {
    var $checkedTasks = this.getCheckedTasks();
    $checkedTasks.each(function () {
        $(this).remove();
    });
}

HTMLInterface.prototype.reset = function () {
    this.$list.each(function () {
        $(this).children('a').remove();
    });
}

HTMLInterface.prototype.getCheckedTasks = function () {
    return this.$list.children('a').filter(function () {
        if ($(this).find('input').prop('checked'))
            return $(this);
    });
};

HTMLInterface.prototype.appendRow = function (text) {
    //Bootstrap checkbox format
    var checkbox =  '<label class="custom-control custom-checkbox">'
                        + '<input type="checkbox" class="custom-control-input">'
                        + '<span class="custom-control-indicator"></span>'
                    + '</label>';

    this.$list.append('<a>' + text + checkbox + '</a>');
}

HTMLInterface.prototype.extractText = function () {
    return this.$textContainer.val();
}

HTMLInterface.prototype.clearTextContainer = function () {
    this.$textContainer.val('');
}

HTMLInterface.prototype.update = function (taskHandler) {
    this.$pendingWork.text(taskHandler.getPending().length);
    this.$taskCompletion.text(taskHandler.getTaskCompletion());
}