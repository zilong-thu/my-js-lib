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

  // 要注意对 <%%> 之间的代码段使用捕获
  var reg = /<%([^%>]*)%>/g;

  var add = function(line, isJS) {
    // 清除模板每行的首尾空格
    line = line.trim();

    // 换行符、回车符、制表符也都删除
    var res = 'r.push("' + line.replace(/[\r\t\n]/g, '') + '");\n';

    var isControlBlock = /({|}|if|for|while|switch|case|break|continue)/.test(line);
    if (isControlBlock) {
      // 如果某行里包含了控制逻辑代码，那么在剃掉 <%%> 后，代码直接执行即可，不必 push 到一个数组中
      res = line + '\n';
    } else if (isJS) {
      // 如果是其他的（取右值的表达式），那么 push 到数组中
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


