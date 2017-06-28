//Global functions
const tools = {};

tools.xhr = function(o){
  //XHR2 req
  var request = new XMLHttpRequest();
  request.open(o.type, o.url);
  var encoding = o.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8';
  request.setRequestHeader("Content-Type", encoding);

  //XHR2 events
  var isLoading = false;
  var progress = function(e){
    //Set global loading mode here
    if(!isLoading){

    }
  };

  var load = function (e) {
    if (e.target.readyState === 4) {
      o.success(e.target);
    }
  };

  request.addEventListener("progress", progress);
  request.addEventListener("load", load);

  if(o.json){
    request.send(JSON.stringify(o.json));
  } else {
    request.send();
  }
}


tools.qsa = function(selector, context){
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}

export default tools;
