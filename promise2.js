
//链式支持

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];  //兼容多个then的情况

    this.then = function (onFulfilled) {
        promise._resolves.push(onFulfilled);
        //简单返回this 既可以支持链式操作
        return this;
    };

    function resolve(value) {
        //这里加入 setTimout 0 是为了先让then的回调加入进去， 下面这种非异步的情况
        //new Promise(function(resolve){  我这里没有异步， 直接成功了 resolve(); }).then( fn1 ) }
        setTimeout(function() {
            promise._resolves.forEach(function (callback) {
                callback(value);
            });
        },0);
    }

    fn(resolve);
}

