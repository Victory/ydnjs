function log (i1) {
    var log = document.getElementById('log');
    var li = document.createElement('li');
    var text = document.createTextNode(i1);
    li.appendChild(text);
    log.appendChild(li);
}
