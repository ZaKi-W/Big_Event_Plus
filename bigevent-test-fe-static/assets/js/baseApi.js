var baseURL = 'http://localhost:8888'

$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // 如果需要身份认证，则在headers中添加token值，如果没有token，则添加空值
    if (params.url.indexOf('/admin/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截(有空再写把)
    
})