$(function () {
    // 点击去注册按钮，登录界面隐藏hide，注册界面显示show
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录按钮，注册界面隐藏hide，登录界面显示show
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui里获取form对象
    const form = layui.form;
    // 获取layui弹窗
    const layer = layui.layer;


    form.verify({
        // 密码校验
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (value) => {
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return "两次输入的密码不一致"
        }
    })

    // 接口url
    const baseUrl = 'http://www.liulongbin.top:3007';

    // 注册功能
    $('#form_reg').on('submit', (e) => {
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败')
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                // 把返回的身份令牌保存在本地存储，访问其他功能不用重新登录
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})