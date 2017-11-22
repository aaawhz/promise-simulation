// 初步构建

function Promise(fn){
  //利用callback存放then的回调
  var callback;

  this.then = function(done){
    callback = done;
  }

  //resolve执行， 顺便把then回调执行了
  function resolve(){
    callback();
  }

  //这里才执行fn， 把resolve传入
  fn(resolve);
}


var fn = function(){
  setTimeout(function(){
    resolve("已经执行完成")
  },1000)
};

var p = new Promise(fn); //fn传入， 但不是在这里执行， 因为fn需要参数， 所以在promise内部包装好resolve函数