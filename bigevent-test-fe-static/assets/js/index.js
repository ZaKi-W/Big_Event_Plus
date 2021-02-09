$(function () {
    var layer = layui.layer
    // 退出
    $('#btnOut').on('click', function () {
        layer.confirm('确定要退出吗?', function (index) {
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/bigevent-test-fe-static/login.html'
            // 关闭
            layer.close(index);
        });
    })
})