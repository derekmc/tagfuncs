
const TagFuncs = require("./tagfuncs.js");
Test();

function Test(){
  const {div, h1, button, table, tr, th} = TagFuncs;
  let html =
    div('#main -padding:10px -border:"2px solid blue";',
      h1("Hello, World"),
      button(':onclick="alert(\'test\')"', 'Click Me'),
      table('',
        tr(th('A'), th('B'), th('C'))));
  console.log('html', html);
  // document.body.innerHTML = html;
}

