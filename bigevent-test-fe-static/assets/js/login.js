$(function () {
    var layer = layui.layer
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('.loginBox [name=username]').val(),
                password: $('.loginBox [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/bigevent-test-fe-static/index.html'
            }
        })
    })
})