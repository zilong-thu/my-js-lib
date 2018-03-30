var TPL = `<div><% this.name %></div>
  <div><% this.age %></div>
  <ul>
  <% for (var i = 0; i < 3; i++) { %>
    <li><% i %></li>
  <% } %>
  </ul>
`;

function compile(tpl, data) {
  var code = 'var r = [];\n';
  var cursor = 0, match;

  var reg = /<%([^%>]*)%>/g;

  var add = function(line, isJS) {
    line = line.trim();
    var res = 'r.push("' + line.replace(/[\r\t\n]/g, '') + '");\n';
    var isControlBlock = /({|}|if|for|while|switch|case|break|continue)/.test(line);
    if (isControlBlock) {
      res = line + '\n';
    } else if (isJS) {
      res = 'r.push(' + line + ');\n';
    }

    code += res;
  }

  while(match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index));
    add(match[1], true);
    cursor = match.index + match[0].length;
  }

  add(tpl.substr(cursor, tpl.length - cursor));

  code += 'return r.join("")';
  console.log(code, '\n');

  var func = new Function(code);
  return func.call(data);
}

var res = compile(TPL, {name: 'haha', age: 23});
console.log(res);


