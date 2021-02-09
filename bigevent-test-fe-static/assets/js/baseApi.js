var baseURL = 'http://localhost:8888'

$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
})