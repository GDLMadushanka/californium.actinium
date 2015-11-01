

var Container = extend(Java.type("java.lang.Object"), {
  get: function(){
    return "A";
  }
});

var Container2 = extend(Container, {
  get: function(){
    return this.super.get() + " B";
  },
  one: function(){
    return "One";
  }
});

var Container3 = extend(Container2, {
  get: function(){
    return this.super.get() + " C " + this.one();
  }
});
var Container4 = extend(Container3, {
  one: function(){
    return "1";
  }
});


app.root.onget = function(request) {
  var a = new Container();
  var b = new Container2();
  var c = new Container3();
  var d = new Container4();
  if(a.get() != "A"){
    request.respond(ResponseCode.BAD_REQUEST, a.get());
    return;
  } 
  if(b.get() != "A B"){
    request.respond(ResponseCode.BAD_REQUEST, b.get());
    return;
  } 
  if(c.get() != "A B C One"){
    request.respond(ResponseCode.BAD_REQUEST, c.get());
    return;
  } 
  if(d.get() != "A B C 1"){
    request.respond(ResponseCode.BAD_REQUEST, d.get());
    return;
  } 
  request.respond(ResponseCode.CONTENT, "OK");
};