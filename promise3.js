// 加入了状态

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];

        //只有 new了 Promise 就设置状态为进入等待
        promise._status = 'PENDING';

    this.then = function (callback) {

        if (promise._status === 'PENDING') {
            promise._resolves.push(callback);
            return this;
        }

        //如果没有在 new Promise的状态， 直接执行回调, 兼容异步完成之后调用then的情况
        callback(value);

        return this;
    };


    function resolve(value) {
        setTimeout(function(){           
            promise._resolves.forEach(function (callback) {
                callback(value);
            });

            //执行完后， 状态结束， 设置为全部搞定
            promise._status = "FULFILLED";
        },0);
    }

    fn(resolve);
}

//===================================

var p = new Promise(fn);

//
p.then(function(data){console.log(data)}).then(function(){console.log('end')});

