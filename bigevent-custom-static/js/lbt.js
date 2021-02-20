$(function() {
    // 获取轮播图列表
    var layer = layui.layer
    $.ajax({
        method: "GET",
        url: "http://localhost:8888/api/swipers",
        success: function(res) {
            var htmlStr = template('tpl-lbt', res)
            $('.kr_banner .jdt').html(htmlStr)
        }
    });
})