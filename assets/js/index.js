// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: function (res) {
            renderAvatar(res.data);
            // console.log(res);
        }
    })
}

// 渲染用户信息
const renderAvatar = (user) => {
    console.log(user);
    let uname = user.nickname || user.username;
    // 渲染欢迎语
    $('#welcome').html(`欢迎${uname}`)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 把头像渲染上去
        $('.layui-nav-img').attr('stc', user.user_pic)
        // 文字头像隐藏
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        // 渲染文字头像并改成大写toUpperCase()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}

// 退出登录
$("#loginout").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});

getUserInfo()