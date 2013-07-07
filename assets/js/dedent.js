(function() {
    var markdown_indent = function(lines) {
        for (var i in lines) {
            if (lines[i] === '') {
                continue;
            }
            var n = (lines[i][0] === '<') ? lines[i].indexOf('>') + 1 : 0;
            if (lines[i].slice(n, n+4) !== '    ') {
                return false;
            }
        }
        return true;
    };

    var remove_indent = function(lines) {
        for (var i in lines) {
            var n = (lines[i][0] === '<') ? lines[i].indexOf('>') + 1 : 0;
            lines[i] = lines[i].substr(0, n) + lines[i].substr(n+4);
        }
        return lines;
    };

    var codes = document.getElementsByTagName('pre');

    for (var i in codes) {
        if (isNaN(parseInt(i))) {
            continue;
        }
        var code = codes[i].firstChild;
        var lines = code.innerHTML.split('\n');
        if (markdown_indent(lines)) {
            lines = remove_indent(lines);
        }
        code.innerHTML = lines.join('\n');
    }
}());

// line numbering

jQuery("pre code").html(function(index, html) {
    return html.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>")
});