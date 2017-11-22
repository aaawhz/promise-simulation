// 串行promise和 异步结果的传递
//例如我们先用ajax从后台获取用户名，
//再根据该数据去ajax获取其用户资料。

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];
        promise._status = 'PENDING';

    this.then = function (callback) {
        /**
            //promise1
            new Promise(function(resolve){
                setTimeout(function(data){resolve(data)},20000)
            })
            .then(function(){
                //promise2
                return new Promise(function(resolve){resolve(2)}).then(function(){
                    //fn2
                });
            })
            .then(
                //promise3
                return new Promise( function(resolve){resolve(3)}).then(function(){
                    //fn3
            });
        **/

        return new Promise(function(resolve) {

            //oo1会调用handle
            function handle(value) {
                //保存下一个then的结果
                var ret = typeof callback === 'function' && callback(value) || value;
                //resolve是
                resolve(ret);
            }

            if (promise._status === 'PENDING') {
                //如果promise1没有完成， 把后面的then存放在数组中， 并不执行
                //直到调用resolve 
                promise._resolves.push(handle);

            } else if(promise._status === FULFILLED){

                handle(value);
            }
        })
        
    };


    //这里跟上个列子一样
    function resolve(value) {
        setTimeout(function(){
            promise._status = "FULFILLED"; // oo1
            promise._resolves.forEach(function (callback) {
                callback( value);
            })
        },0);
    }

    fn(resolve);
}


//===============================================================================

//promise1
new Promise(function(resolve){
    setTimeout(function(data){resolve(data)},20000)
})
.then(function(){
    //promise2
    return new Promise(function(resolve){resolve(2)}).then(function(){
        //fn2
    });
})
.then(
    //promise3
    return new Promise( function(resolve){resolve(3)}).then(function(){
        //fn3
});

/*

首先我们创建了一个 Promise 实例，这里叫做 promise1；

接着会运行 fn1(resolve);

但是 fn1 中有一个 setTimeout 函数，于

是就会先跳过这一部分，运行后面的第一个 then 方法;


then 返回一个新的对象 promise2,  promise2 对象的

resolve 方法和 then 方法的中回调函数 fn2 都被封

装在 handle 中， 然后 handle 被添加到 　　

promise1._resolves 数组中。



接着运行第二个 then 方法，同样返回一

个新的对象 promise3, 包含 promise3

的 resolve 方法和 回调函数 fn3 的 han

dle 方法被添加到 promise2._resolves 数组中。

到此两个 then 运行结束。 setTimeout

中的延迟时间一到，就会调用 promise1的 resolve方法。



resolve 方法的执行，会调用 promise1

._resolves 数组中的回调，之前我们添加的

handle 方法就会被执行； 也就是 fn2 和 pr

omsie2 的 resolve 方法，都被调用了。

promise3 的 resolve 方法

至此所有回调执行结束

*/