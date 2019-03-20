var auths = {};
mui.plusReady(function() {
	// 获取登录认证通道
	plus.oauth.getServices(function(services) {
		for(var i in services) {
			var service = services[i];
			auths[service.id] = service;
		}
	}, function(e) {
		console.log("获取登录认证失败：" + e.message);
	});
});
// id 为 qq,weixin,weibo 
function login(id) {
	console.log("----- 登录认证 -----");
	var auth = auths[id];
	if(auth) {
		var w = plus.nativeUI.showWaiting();
		document.addEventListener("pause", function() {
			setTimeout(function() {
				w && w.close();
				w = null;
			}, 2000);
		}, false);
		auth.login(function() {
			w && w.close();
			w = null;
			console.log("登录认证成功：");
			console.log(JSON.stringify(auth.authResult));
			
			//先判断是否已经注册
			mui.post('http://se rver-name/login/check_user.php', {
				access_token: auth.authResult.access_token
			}, function(data) {
				//跟login页面_successLogin函数处理差不多
				if(data.ret===1){//已经注册，直接登录成功
					//登录成功，存储用户信息
					return;
				}else{
					userinfo(auth);
				}
			}, 'json');
			
			//userinfo(auth);
		}, function(e) {
			w && w.close();
			w = null;
			console.log("登录认证失败：");
			console.log("[" + e.code + "]：" + e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html", null, "登录失败[" + e.code + "]：" + e.message);
		});
	} else {
		console.log("无效的登录认证通道！");
		plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
	}
}

// 获取用户信息
function userinfo(a) {
	console.log("----- 获取用户信息 -----");
	a.getUserInfo(function() {
		console.log("获取用户信息成功：");
		console.log(JSON.stringify(a.userInfo));
		var nickname = a.userInfo.nickname || a.userInfo.name;
		//		plus.nativeUI.alert("欢迎“" + nickname + "”登录！");
		
		//跳到手机号码绑定页面，绑定手机号
		//请求数据库，注册新用户
		mui.post('http://server-name/login.php', {
			access_token: a.authResult.access_token,
			nickname:nickname,
			head_img: a.userInfo.headimgurl,
			sex:a.userInfo.sex
			//phone:phone
		}, function(data) {
			//跟login页面_successLogin函数处理差不多
			if(data.ret===1){
				//登录成功，存储用户信息
			}else{
				//登录失败
			}
		}, 'json');
		
	}, function(e) {
		console.log("获取用户信息失败：");
		console.log("[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("获取用户信息失败！", null, "登录");
	});
}
// 注销登录
function logoutAll() {
	console.log("----- 注销登录认证 -----");
	for(var i in auths) {
		logout(auths[i]);
	}
}

function logout(auth) {
	auth.logout(function() {
		console.log("注销\"" + auth.description + "\"成功");
	}, function(e) {
		console.log("注销\"" + auth.description + "\"失败：" + e.message);
	});
}