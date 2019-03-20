var IMG_URL = 'http://115.236.33.6:3130';
var BASE_URL='http://115.236.33.6:3130';
function muiRequest(options) {
	mui.plusReady(function() {
		var TIMEOUT = 10000;
	var token = plus.storage.getItem('token') || '';
//	var token = ''
	options.successFn = options.successFn || function() {};
//	options.errorFn = options.errorFn || function() {};
    mui.ajax(BASE_URL+options.url,{
    	data: options.data || null,
    	dataType: options.dataType || "json",
        type: options.type || "get",
        timeout: options.timeout || TIMEOUT, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			'X-AUTH-TOKEN': token
		},
        success: function(data){
            options.successFn(data);
        },
        error: function(xhr,type,errorThrown){
        	console.log(JSON.stringify(xhr))
            if(xhr.status == 401) {
				mui.openWindow({
					id: 'login',
					url: 'login.html'
				});
			} else {
//				mui.toast(xhr.message)
			}
        }
    });
	})
}