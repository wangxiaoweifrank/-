$(function(){
    getUserInfo()

  
    // 退出后台功能
    $('#btn-close').click(function () { 

        layer.confirm('确认是否退出?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地token
            localStorage.removeItem('token')
            // 2.跳转至登陆页
            location.href = '/login.html'

            layer.close(index);
          });
            
        
    });
   
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            // 渲染头像
            renderAvatar(res.data)
        },
        complete:function(res){
            console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                location.href = '/login.html'
            }
        }
    });
}

// 渲染头像
 function renderAvatar(data){
    // 1.获取用户名昵称渲染
    var name = data.nickname || data.username
    $('.welcome').html('欢迎&nbsp&nbsp'+name)

    // 2.获取头像渲染
    if(data.user_pic !== null){
        $('.layui-nav-img').attr('src',data.user_pic).show()
        $('.textAvatar').hide()
    }else{
        // 提取首字母，转换成大写字母，渲染到头像
        var one = name[0].toUpperCase()
        $('.textAvatar').html(one).show()
        $('.layui-nav-img').hide()
    }
 }