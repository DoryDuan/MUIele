## mui
[mui初级入门教程（二）— html5+ webview 实现底部](http://ask.dcloud.net.cn/article/650)

通过mui.open方法打开之前的一个页面，没有动画。如：登录页面->注册页面->通过mui.open方法到登录页面

## 移动端300毫秒延迟
1. 引入fastclick插件
2. 用mui封装好的tab事件代替click事件

## mui 
### ajax全局调用封装
1. [jquery Ajax 全局调用封装](https://blog.csdn.net/xllily_11/article/details/51567186)
2. [jquery Ajax 全局调用封装](https://bbs.csdn.net/topics/330015234)

### mui-hello参考
1. 多选可以参考hello-mui的indexed-list-select.html页面
2. 一个页面多个下拉刷新，上拉加载参考pullrefresh_with_tab.html
3. 底部选项卡-div模式：tabbar.html；底部选项卡-webview模式：tab-webview-main.html
4. 引用mui-hello里面的mui.min.js，单页面的下拉刷新会卡顿，建议使用mui.min1.js
5. [选项卡+下拉刷新demo修改](http://ask.dcloud.net.cn/article/787)

### 打包
1. [参考网址](http://ask.dcloud.net.cn/article/89)

### 功能
1. 打开新窗口
	* [新窗口&子页面](http://ask.dcloud.net.cn/article/13012)
	* [打开新页面，需不需要关闭当前的页面呢？](http://ask.dcloud.net.cn/question/46867)
	
	打开新页面，当前页面关闭mui.back()
	* 方法一：延迟关闭
	```
		mui.openWindow({
			id: 'login',
			url: 'login.html'
		});
		setTimeout(function() {  
            plus.webview.currentWebview().close();  
        }, 300); 
	```
	* 方法二：
	```
		var self = plus.webview.currentWebview();
        plus.webview.open('login.html', 'login.html', '', 'slide-in-right', 300, function() {  
            self.hide()  
            self.close();  
        });  
	```
	* [mui扫码成功后跳转页面 关闭扫码页面](http://ask.dcloud.net.cn/question/48487)
	* [a页面打开b页面,b页面加载成功后关闭当前页面，闪屏](http://ask.dcloud.net.cn/question/6592)
2. (页面关闭后如何刷新上个页面)[http://ask.dcloud.net.cn/question/14019]
	* 方法一：在新页面里面重写mui.back或者mui.beforeback方法，在该方法里面通过evalJs调用上一个页面里的某个js方法进行数据刷新
	* 方法二：可以用自定义事件，从 b 向 a 发送消息
	* [如何在返回前刷新上一个页面（系统主界面）](http://ask.dcloud.net.cn/question/4475)
	* [关于关闭当前页面返回到上一个页面](http://ask.dcloud.net.cn/question/14019)
	
	页面多层级返回限制及处理
	* [参考文档](http://ask.dcloud.net.cn/article/581)
	
3. 列表页到详情页
	* [列表到详情最佳实践](http://ask.dcloud.net.cn/article/12575)详情页返回列表页时重置页面数据
	
4. 提升HTML5的性能体验
	* [避免切页白屏](http://ask.dcloud.net.cn/article/25%EF%BC%8C%E4%BB%A5%E5%8F%8ADCloud%E6%B5%81%E5%BA%94%E7%94%A8%E9%AB%98%E7%BA%A7%E4%BC%98%E5%8C%96%E5%9F%B9%E8%AE%AD%E6%B2%99%E9%BE%99)
5. 现有webview跳转，动画不出现的问题
	* 已经打开的webview，调用show的时候不会执行动画的。如果一定要每次都有动画，可以尝试先hide窗口，再执行show。每次 openWindow 前都执行一次 hide 当前 webview 就可以了
	* [参考文档](http://ask.dcloud.net.cn/question/24523)
	* [参考文档](http://ask.dcloud.net.cn/question/24532)
6. 报错Error: webview[] does not exist	
	* app的home页面需要加阻止默认事件@tap.stop="goSample" 
7. 没有网络，提示封装

8. mui ajax封装
	* [参考文档](http://ask.dcloud.net.cn/article/12943)
	* [参考文档-各种封装](http://ask.dcloud.net.cn/article/12538)

9. 登录之后，如何跳转到首页

	```
	var indexWebview = plus.webview.getLaunchWebview();
	mui.fire(indexWebview, 'gohome', {});
	indexWebview.show();
	```
	* 跳转到首页之后，子页面获取登录信息
	方法一：
	
	```
	//登录页面登录成功触发自定义事件
	var home = plus.webview.getWebviewById('home')
	mui.fire(home,'get_user',{
		user_data:data.data
	});
	//子页面监听自定义事件
	window.addEventListener('get_user', function(event) {
		console.log(event.detail)
	});
	```
	
	方法二：
	```
	//登录页面登录成功刷新子页面数据
	var homeView = plus.webview.getWebviewById('home');
	homeView.reload();
	```
10. [localStorage与plus.storage区别-【App离线本地存储方案】](http://ask.dcloud.net.cn/article/166)
	* plus.storage只能存储字符串，无法存储数值，localStorage可以存储数值
	* 关闭app,plus.storage和localStorage里面的数据可能丢失。iOS真机运行，调试为了减少缓存影响就清空了。打包后没事的

11. [input输入框，默认的键盘是换行，我想变成搜索改怎么弄](http://ask.dcloud.net.cn/question/22162)
	* [参考文档](http://ask.dcloud.net.cn/article/487)

12. [打开页面默认弹出键盘](http://ask.dcloud.net.cn/question/2324)

13. 滚动到顶部
没用scroll组件
```window.scrollTo(0,0);
```
用了scroll组件
```mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
```
### 注意点
	* [入口页面不能关闭，会导致程序崩溃。可以隐藏起来](http://ask.dcloud.net.cn/question/22824)
	* plus.storage只能存储字符串，无法存储数值，localStorage可以存储数值
### mui下拉刷新
1. 下拉刷新已经初始化化滚动区域了，不需要初始化了
2. 单 webview 模式:H5+的circle样式；双 webview 模式：可以定制样式
3. [mescroll插件](http://ask.dcloud.net.cn/article/12686)

### mui样式
.mui-segmented-control不能自适应高度
1. 方法一:添加.mui-fullscreen默认为全屏
```
.mui-control-content.mui-fullscreen{
    top: 50px;
    bottom: 0;
}
```
2. 方法二
```
.mui-control-content{
height: calc(100vh - 100px);
}
```
### 框架bug
1. [input软键盘不消失](http://ask.dcloud.net.cn/question/28685)
```
	mui('.mui-content').on('tap','input,textarea',function(){
		var bottomElAll = document.querySelectorAll('.mui-poppicker');
		for(var i=0;i<bottomElAll.length;i++){
			var bottomEl = bottomElAll[i];
			bottomElAll[i].style.display = 'none'
		}
	})
	//.show-picker为点击需要展示mui-poppicker的元素
	mui('.mui-content').on('tap','.show-picker',function(){
		var bottomElAll = document.querySelectorAll('.mui-poppicker');
		for(var i=0;i<bottomElAll.length;i++){
			var bottomEl = bottomElAll[i];
			bottomElAll[i].style.display = 'block'
		}
	})
```
2. [软键盘弹出时底部元素上浮的问题](http://ask.dcloud.net.cn/article/12615)
3. [picker与软键盘的冲突](http://ask.dcloud.net.cn/question/20029)
4. [三级联动picker与遮罩冲突](http://ask.dcloud.net.cn/question/15051)

### 微信登录
1. [appid的获取](https://zhidao.baidu.com/question/432747476143089804.html)
2. [微信登录资料1](http://www.hcoder.net/course/info_240.html)
3. [微信登录资料2](http://ask.dcloud.net.cn/article/12624)
4. [微信登录资料3](http://ask.dcloud.net.cn/article/192)

## vue
1. [vue+checkbox/radio的用法](https://vuejs.org/v2/guide/forms.html#Checkbox)
2. [vue事件代理](https://segmentfault.com/a/1190000011698763)
3. [Vue动态生成的input怎么实现数据双向绑定](https://segmentfault.com/q/1010000010718798/)
4. [Vue动态生成的input怎么实现数据双向绑定](https://segmentfault.com/q/1010000013644065)
 
## html
### form表单
点击form标签包裹的button，需要加上属性action="javascript:;"不然页面会刷新
http://www.hcoder.net/course/info_240.html

## js
### 头像裁剪上传
1. [demo](https://blog.csdn.net/ljt123456765/article/details/79716260)
2. [文档](https://blog.csdn.net/weixin_38023551/article/details/78792400)
3. [裁剪前先压缩图片](http://ask.dcloud.net.cn/article/12848)

## 资料
### 后台管理系统 UI
[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/)

