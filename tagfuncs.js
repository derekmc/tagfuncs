
const TagFuncs = (function(){
  // lets you update specific tags.
  const IDPRE = "tagID-";
  const watched_tags = {};
  const id_counter = 0;
  const id_list = [];
  const ids_by_tag = {}; //
  const id_htmls = []; // cache generated html for watched tags.
  
  let htmltags = `
    a abbr acronym address applet area article aside
    audio b base basefont bdi bdo big blockquote
    body br button canvas caption center cite code
    col colgroup data datalist dd del details dfn
    dialog dir div dl dt em embed fieldset
    figcaption figure font footer form frame frameset h1
    head header hr html i iframe img input
    ins kbd label legend li link main map
    mark meta meter nav noframes noscript object ol
    optgroup option output p param picture pre progress
    q rp rt ruby s samp script section
    select small source span strike strong style sub
    summary sup svg table tbody td template textarea
    tfoot th thead time title tr track tt
    u ul var video wbr`.split(/\s+/).slice(1);
  // TODO for input types with a dash 'datetime-local' make the function
  // camelcase 'datetimeLocal'
  let inputtypes = `
    button checkbox color date datetime-local email
    file hidden image month number password radio
    range reset search submit tel text time
    url week`.split(/\s+/).slice(1);

  // console.log('htmltags', htmltags);
  // console.log('inputtypes', inputtypes);
  let tags = {};
  htmltags.forEach(t => htmlTag(t, tags));
  inputtypes.forEach(t => inputTag(t, tags));
  
  // all single letter tags are given a long name as well to help avoid variable collisions.
  let longnames = {s: 'strikethrough', b: 'bold', u: 'underline', i: 'italics', p: 'paragraph', q: 'quote', a: 'anchor'};
  for(let k in longnames) tags[longnames[k]] = tags[k];
  return tags;

  function AddTag(tagname, tagfunc){
  }
  // watched tags can be updated, so long as WatchTag is called, before the tag is rendered
  function WatchTag(tagname){
    
  }
  function DirtyTag(tagname){
  }
  function DirtyId(id){  // must be a watched tag.
  }
  function Update(){  // updates all the dirty tags
  }
  
  function UpdateTag(tagname){
  }
  
  function escDbl(s){ // escape double quotes.
    return s.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
  }
  function removeDbl(s){ // remove double quotes
    return s.replace(/\"/g, "");
  }
  function htmlTag(tagname, tags){
    let id_counter = 0;
    tags[tagname] = (...args) => {
      let attrstr = args[0];
      let attrs = convertAttributes(attrstr);
      // if the first argument matches an attrstr, use it for attributes,
      // otherwise, use it for html.
      let inner = args.slice(attrs? 1 : 0).join('');
      return `<${tagname}${attrs? ' ' + attrs: ''}>${inner}</${tagname}>`;
    }
  }
  function inputTag(inputtype, tags){
    tags[inputtype] = (...args) => {
      let attrstr = args[0];
      let attrs = convertAttributes(attrstr);
      // if the first argument matches an attrstr, use it for attributes,
      // otherwise, use it for html.
      let inner = args.slice(attrs? 1 : 0).join('');
      return `<input type="${inputtype}" ${attrs? ' ' + attrs: ''}>${inner}</input>`;
    }
  }
  // this is the html attribute language
  // it uses a unique prefix for each type of field.
  // .class #id -cssproperty:"css value" :prop=value
  function convertAttributes(attrstr){
    let prefixre = /^[\.\-\#\:]/;
    let attraliasre = /[\.\:\-\#]([^\s"']|"[^"]*"|'[^']*')+/g;
    if(!attrstr.match(prefixre)){
      return null;
    }
    let attrs = {};
    let parts = attrstr.match(attraliasre);
    let result = "";
    let classStr = "";
    let styleStr = "";
    for(let i=0; i<parts.length; ++i){
      let part = parts[i];
      let pre = part[0];
      let s = part.slice(1).trim();
      switch(pre){
        case '.':
          classStr += s + " ";
          break;
        case '-':
          if(s[s.length-1] != ';') s += ";"
          styleStr += s + " ";
          break;
        case '#':
          result += "id=\"" + s + "\" ";
          break;
        case ':':
          result += s + " ";
          break;
      }
    }
    if(classStr.length){
      result += "class=\"" + classStr.trim() + "\" ";
    }
    if(styleStr.length){
      result += "style=\"" + removeDbl(styleStr.trim()) + "\" ";
    }
    return result.trim();
  }
})();

if(typeof module !== undefined){
   module.exports = TagFuncs;
}
