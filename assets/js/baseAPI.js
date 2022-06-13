// 每次发送ajax函数前都会调用这个函数
// option 是发送ajax请求里面的参数
$.ajaxPrefilter(function(option){
    // 进行url拼接
    option.url = 'http://www.liulongbin.top:3007' + option.url
    console.log(option.url);
})