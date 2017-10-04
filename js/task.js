function Task (text, isMarked) {
    this.text = text;
    this.marked = isMarked || false;
}

Task.prototype.rename = function (text) {
    this.text = text;
}

/* 
Task.prototype.isMarked = function () {
    return this.marked && true;
}
*/
