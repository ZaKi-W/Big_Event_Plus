$(function() {
    var layer = layui.layer



    // 获取轮播图列表
    function initShowList() {

        $.ajax({
            method: "GET",
            url: "/admin/swipers",
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('.layui-table tbody').html(htmlStr)

            }
        })
    }
    initShowList()

    // 轮播图
    $('.layui-table tbody').on('click', '.layui-badge', function(e) {
        var status = $(e.target).data('status')
        var Id = $(this).data('id');
        $.ajax({
            type: 'PUT',
            url: '/admin/swipers/' + Id,
            data: {
                status: status
            },
            success: function(res) {
                if (res.status === 0) {
                    // 切换成功
                    layer.msg(res.message)
                    initShowList()
                }
            }
        })
    })

    // 删除
    $('.layui-table tbody').on('click', '.btn-delete', function() {
        var Id = $(this).data('id');
        // 先是对话框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "delete",
                url: "/admin/swipers/" + Id,
                success: function(res) {
                    if (res.status === 0) {
                        initShowList()
                        layer.msg('删除成功！')
                        layer.close(index)
                    }
                }
            })
        })
    })

    // 为上传按钮添加点击事件
    $('#btnAdd').on('click', function() {
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function(e) {
        let files = e.target.files
        var fd = new FormData()
        $.each(files, function(index, item) {
            fd.append('swipers', item)
        })
        console.log(fd);
        $.ajax({
                method: 'POST',
                url: '/admin/swipers',
                data: fd,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res.status === 0) {
                        layer.msg(res.message)
                        initShowList()

                    }
                }
            })
            // alert(11)
    })
})