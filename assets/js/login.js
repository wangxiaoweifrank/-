$(function(){
    // 登陆注册页面切换
    $('#link_reg').click(function(){
        $('.login').hide()
        $('.reg').show()
    })
    $('#link_login').click(function(){
        $('.login').show()
        $('.reg').hide()
    })

    // 表单预验证
    var form = layui.form
    // 1.添加自定义表单验证
    form.verify({
        pwd:[ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致，value是添加预验证的表单值
        repwd:function(value){
            var pwd = $('.reg [name=password]').val()
            if ( pwd !== value){
                return '两次密码输入不一致！'
            }
        }
    })

    // 用户注册事件
    // 1.初始化layer模块
    var layer = layui.layer
    $('#form_reg').submit(function (e) { 
        // 2.阻止默认跳转行为
        e.preventDefault();
        // 3.编辑请求体data参数
        data ={
            username: $('.reg [name=username]').val(),
            password: $('.reg [name=password]').val(),
        }
        // 4.发送ajax请求
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if(res.status !== 0){
                    // 5.提示注册失败消息
                    return layer.msg(res.message)
                }
                // 5.提示注册成功消息
                layer.msg(res.message)
                // 6.注册成功延迟1秒跳转到登入页面
                setTimeout(function(){
                    $('#link_login').click()
                },1000)    
            }
        });
    });


    // 用户登录事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        data = {
            username: $('.login [name=username]').val(),
            password:$('.login [name=password ]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 将token存储到本地
                localStorage.setItem('token',res.token)
                // 跳转到主页
                location.assign('./index.html')
            }
        })
    })
})