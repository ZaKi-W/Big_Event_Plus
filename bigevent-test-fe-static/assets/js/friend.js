$(function () {
    var layer = layui.layer
    var form = layui.form

    // 获取
    getLinks()
    function getLinks() {
        $.ajax({
            method: 'GET',
            url: '/admin/links',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-Links', res)
                $('tbody').html(str)
            }
        })
    }

    // 添加
    $('#add_Links').on('click', function () {
        var index = layer.open({
            type: 1,
            title: '添加友情链接',
            content: $('#add_Link').html(),
            area: ['500px', '350px'],
        });
        // 绑定文件上传按钮点击事件
        $('#addFile').click(function () {
            $('#LinkFile').click()
        })
        // 监听文件选中事件
        let file = null
        // 给文件上传的input添加变化事件
        $('#LinkFile').change(function (e) {
            // 获取到上传的文件的地址
            const objectURL = URL.createObjectURL(e.target.files[0])
            file = e.target.files[0]
            // 渲染图片预览区域
            $('#addpreIcon').attr('src', objectURL)
        })
        // 监听表单提交事件
        $('#add_form').submit(function (e) {
            e.preventDefault()
            var fd = new FormData(this)
            $.ajax({
                method: 'POST',
                url: '/admin/links',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.close(index)
                    getLinks()
                }
            })
        })
    })

    // 编辑
    $('tbody').on('click', '#Links_edit', function (e) {
        var id = $(this).attr('data-id')
        // 获取点击目标的id对应的链接数据
        $.ajax({
            method: "GET",
            url: '/admin/links/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功之后弹窗
                var index = layer.open({
                    type: 1,
                    title: '编辑友情链接',
                    // 弹窗里的内容，用模板引擎渲染的方法就是下面这行这么做
                    content: $('#edit_Links').html(),
                    area: ['500px', '350px']
                })
                // 初始化表单数据
                var str = template('edit_Links', res.data)
                $("#edit_form").html(str)
                // 弹窗内容中，图片预览部分
                $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
                // 绑定文件上传按钮点击事件
                $('#editFile').click(function () {
                    $('#editLinkFile').click()
                })
                // 监听文件选中事件
                let file = null    //用来判断是否上传了文件
                /////////////////////////////////////////////////////////////////////////////////
                // 给文件上传的input添加变化事件
                $('#editLinkFile').change(function (e) {
                    const objectURL = URL.createObjectURL(e.target.files[0])
                    file = e.target.files[0]
                    // 文件上传后，图片预览区域会变化
                    $('#preIcon').attr('src', objectURL)
                })
                ////////////////////////////////////////////////////////////////////////////////////
                // 监听表单提交事件
                $('#edit_form').submit(function (e) {
                    e.preventDefault()
                    var fd = new FormData(this)
                    // 判断是否上传了图片
                    // if (file) {
                    //     fd.append('linkicon', file)
                    // }
                    $.ajax({
                        method: 'PUT',
                        url: '/admin/links/' + id,
                        data: fd,
                        // formdata格式都得加下面这两行
                        processData: false,
                        contentType: false,
                        success: function (res) {
                            if (res.status !== 0) {
                                return layer.msg(res.message)
                            }
                            layer.close(index)
                            getLinks()
                        }
                    })
                })
            }
        })
    })

    // $('tbody').on('click', '#Links_edit', function (e) {
    //     var id = $(this).attr('data-id')
    //     // 点击编辑按钮就弹窗
    //     var index = layer.open({
    //         type: 1,
    //         title: '编辑友情链接',
    //         area: ['500px', '350px'],
    //         content: $('#edit_Links').html()
    //     });
    //     // 弹窗之后直接调用ajax获取当前点击的目标id的内容
    //     $.ajax({
    //         method: 'GET',
    //         url: '/admin/links/' + id,
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)
    //             }
    //             // 渲染模板引擎
    //             var str = template('edit_Links', res.data)
    //             $('#edit_form').html(str)
    //             $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
    //             // 给上传图片按钮添加点击事件，点击了这个按钮之后触动隐藏的上传文件input
    //             $('#editFile').click(function () {
    //                 $('#editLinkFile').click()
    //             })
    //             // 这里定义一个可以重复使用的file
    //             let file = null
    //             // 监听文件选中事件
    //             $('#editLinkFile').change(function (e) {
    //                 // 这里得到的是图片的地址
    //                 const objectURL = URL.createObjectURL(e.target.files[0])
    //                 // 这里把得到的图片地址赋值给file变量
    //                 file = e.target.files[0]
    //                 // 这里把图片的地址渲染到img标签上
    //                 $('#preIcon').attr('src', objectURL)
    //                 // 绑定表单提交事件
    //                 $('#edit_form').on('submit', function (e) {
    //                     e.preventDefault()
    //                     var fd = new FormData(this)
    //                     // 这里判断是否上传了图片,如果上传了,就把图片地址加到fd里面
    //                     if (file) {
    //                         fd.append('linkicon', file)
    //                     }
    //                     $.ajax({
    //                         type: 'PUT',
    //                         url: '/admin/links/' + id,
    //                         data: fd,
    //                         processData: false,
    //                         contentType: false,
    //                         success: function (res) {
    //                             if (res.status === 0) {
    //                                 layer.msg('修改成功')
    //                                 layer.close(index)
    //                                 getLinks()
    //                             }
    //                         }
    //                     })
    //                 })
    //             })
    //         }
    //     })
    // })

    // 删除
    $('tbody').on('click', '#Links_del', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定要删除吗?', function (index) {
            $.ajax({
                method: 'DELETE',
                url: '/admin/links/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                }
            })
            getLinks()
            layer.close(index);
        });

    })
})