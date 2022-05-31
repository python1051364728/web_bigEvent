$(function () {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (val) => {
            if (val === $('[name=oldPwd]').val()) return "新旧密码不能一致"
        },
        rePwd: (val) => {
            if (val !== $('[name=newPwd]').val()) return "两次输入的密码不一致"
        }
    })

    // 更新密码
    $('.layui-form').submit((e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('修改密码失败')
                // 修改密码成功，清空本地存储
                localStorage.removeItem('token');
                window.parent.location.href = '/login.html';
            }
        })
    })

})