$(function () {
    var n = 0;
    $('#list').click(function () {
        for (var i = 1; i <= 1; i++) {
            ++n;
            var h = $(this).data('count', n).html(n)
        }
    })
    // 获取文章id
    let id = new URLSearchParams(location.search).get('id')
    console.log(id);
    // 评论列表
    function CommentList() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/api/articles/' + id + '/comments',
            success: function (res) {
                if (res.status === 0) {
                    var arr = ['<h4><i class="sprites"></i>评论区</h4>']
                    res.data.forEach(function (item) {
                        arr.push(`<div class="kr_comment_card">
                        <div class="img-wrap">
                          <img src="./uploads/avatar_3.jpg" alt="">
                        </div>
                        <div class="info">
                          <p>${item.uname} · <span>2020-08-16</span></p>
                          <p>${item.content}</p>
                        </div>
                        <a href="javascript:;" class="like">${item.count}</a>
                      </div>`)
                    })
                    $('#comment-list').html(arr.join(''))
                }
            }
        })
    }
    CommentList()
    // 发表评论
    $('#comment-form').submit(function (e) {
        e.preventDefault()
        let fa = $(this).serialize()
        $.ajax({
            type: 'post',
            url: 'http://localhost:8888/api/articles/' + id + '/comments',
            data: fa,
            success: function (res) {
                if (res.status === 0) {
                    // 发布评论成功
                    layer.msg(res.message)
                    $('#comment-form').get(0).reset()
                    CommentList()
                }
            }
        })
    })
})