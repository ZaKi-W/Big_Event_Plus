$(function () {
    //评论功能
    // template.defaults.imports.formatDate = function (date) {
    template.defaults.imports.formatDate = function (date) {
        // 对原始的日期对象进行处理
        date = new Date(date)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    }
    // // 1.定义提交参数
    // var q = {
    //     pagenum: 1, 	// 页码值
    //     pagesize: 2,	//每页显示多少条数据
    //     cate_id: "",	//文章分类的 Id
    //     state: "",	//文章的状态，可选值有：已发布、草稿
    // }
    // 1.渲染列表
    var layer = layui.layer;
    CommentList()
    function CommentList() {
        $.ajax({
            type: 'GET',
            url: "/admin/comments",
            // data: q,
            success: function (res) {
                // console.log(res.data);
                var tags = template('tpl-table', res)
                $('.layui-table tbody').html(tags)
                // 调用分页
                console.log(res);
                // renderPage(res.total);
            }
        })
    }
    CommentList()

    // // 5.分页
    // var laypage = layui.laypage;
    // function renderPage(total) {
    //     console.log(total);
    //     laypage.render({
    //         elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
    //         count: total,  //数据总数，从服务端得到
    //         limit: q.pagesize, // 每页几条
    //         curr: q.pagenum, // 第几页，默认也是第一页，也可以不写

    //         layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    //         limits: [2, 3, 5, 10],
    //         // 触发jump：分页初始化的时候，页码改变的时候
    //         jump: function (obj, first) {
    //             // obj:所有参数所在的对象；first：是否是第一次初始化分页
    //             // 改变当前页;
    //             q.pagenum = obj.curr;
    //             q.pagesize = obj.limit;
    //             // 判断，不是第一次初始化分页，才能重新调用初始化文章列表
    //             if (!first) {
    //                 // 初始化文章列表
    //                 CommentList()
    //             }
    //         }
    //     });
    // }
    // 删除评论
    $('.layui-table tbody').on('click', '.delete', function (e) {
        var id = $(e.target).data('id')
        layer.confirm('确认要删除吗？', function (index) {
            $.ajax({
                type: 'delete',
                url: '/admin/comments/' + id,
                success: function (res) {
                    if (res.status === 0) {
                        // 关闭窗口
                        layer.close(index)
                        // 刷新类别
                        CommentList()
                    }
                }
            })
        })
    })
})