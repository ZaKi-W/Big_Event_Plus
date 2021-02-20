$(function () {
    getLink()
    function getLink() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8888/api/links',
            success: function (res) {
                if (res.status === 0) {
                    console.log(res);
                    var str = template('tpl_links', res)
                    $('.kr_collaborator').html(str)
                }
            }
        })
    }
})