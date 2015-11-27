/**
 * 调用示例
 * WxApi.ready(function(api){
 * 	  api.shareToFriend(data);
 * })
 * 
 */

// 必须先引用  http://res.wx.qq.com/open/js/jweixin-1.0.0.js 
var CONST={
	menuItem:{ // 所有菜单项列表
		// 基本类 
		exposeArticle:'menuItem:exposeArticle', // 举报
		setFont:'menuItem:setFont', // 调整字体
		dayMode:'menuItem:dayMode', // 日间模式
		nightMode:'menuItem:nightMode', // 夜间模式
		refresh:'menuItem:refresh', // 刷新
		profile:'menuItem:profile', // 查看公众号（已添加）
		addContact:'menuItem:addContact', // 查看公众号（未添加）
		// 传播类
		appMessage:'menuItem:share:appMessage', // 发送给朋友
		timeline:'menuItem:share:timeline', // 分享到朋友圈
		qq:'menuItem:share:qq', // 分享到QQ
		weiboApp:'menuItem:share:weiboApp', // 分享到Weibo
		favorite:'menuItem:favorite', // 收藏
		facebook:'menuItem:share:facebook', // 分享到FB
		// 保护类
		jsDebug:'menuItem:jsDebug', // 调试
		editTag:'menuItem:editTag', // 编辑标签
		_delete:'menuItem:delete', // 删除
		copyUrl:'menuItem:copyUrl', // 复制链接
		originPage:'menuItem:originPage', // 原网页
		readMode:'menuItem:readMode', // 阅读模式
		QQBrowser:'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
		safari:'menuItem:openWithSafari', // 在Safari中打开
		email:'menuItem:share:email', // 邮件
		brand:'menuItem:share:brand' // 一些特殊公众号
	},
	jsApiList:[ // 所有JS接口列表
    'checkJsApi',
	'onMenuShareTimeline',
	'onMenuShareAppMessage',
	'onMenuShareQQ',
	'onMenuShareWeibo',
	'startRecord',
	'stopRecord',
	'onVoiceRecordEnd',
	'playVoice',
	'pauseVoice',
	'stopVoice',
	'onVoicePlayEnd',
	'uploadVoice',
	'downloadVoice',
	'chooseImage',
	'previewImage',
	'uploadImage',
	'downloadImage',
	'translateVoice',
	'getNetworkType',
	'openLocation',
	'getLocation',
	'hideOptionMenu',
	'showOptionMenu',
	'hideMenuItems',
	'showMenuItems',
	'hideAllNonBaseMenuItem',
	'showAllNonBaseMenuItem',
	'closeWindow',
	'scanQRCode',
	'chooseWXPay',
	'openProductSpecificView',
	'addCard',
	'chooseCard',
	'openCard'
    ]
};

var WxApi=Object.create({
	version: '1.0',
	storages:{
		appId:null,
		timestamp:null,
		nonceStr:null,
		signature:null
	}, // 数据存储
	wxVersion:function(){
		var t = navigator.userAgent.toLowerCase();
		var a = t.match(/micromessenger\/(\d+\.\d+\.\d+)/) || t.match(/micromessenger\/(\d+\.\d+)/);
    	return a ? a[1] : "";
	}(),
	isWx:function(){
		var $this=this;
		return $this.wxVersion !="";
	},
	initialize:function(){ // 初始化 
		var $this=this;
		$this.fetch(function(data){
//			alert('data :'+JSON.stringify(data));
			 
			data.debug=false;
			
			data.jsApiList=CONST.jsApiList;
		
			wx.config(data); // 配置
			
			wx.error(function (res) {
			  // 屏蔽本地测试提示
//			  alert(res.errMsg);
//			  if(res.errMsg!='config:invalid url domain'){
//			  	tips.showTip('请使用微信最新版本!'+res.errMsg);
//			  	tips.hideTip(2000);
//			  }
			  
			});
			
		});
		
		// 检查功能是否支持
		$this.checkJsApi(CONST.jsApiList.slice(1),function(res){
			
			$this._isCheck=true;
			$this.initReady();
			 
			$this.checkResult= res;
			  
			var _keys=Object.keys(res),record={};
			_keys.forEach(function(_v,_i){
				if(!res[_v]){
					record[_v]=res[_v];
				}
			});
			
			/*if(record.hasOwnProperty('onMenuShareTimeline') || record.hasOwnProperty('onMenuShareAppMessage')){
				tips.showTip('请您将微信升级到最新版本!'+res.errMsg);
			  	tips.hideTip(3000);
			}*/
			/*if(Object.keys(record).length){
			    alert('不支持的checkJsApi :'+Object.keys(record).length+' : '+JSON.stringify(record));
			}*/
			 
		});
	},
	fetch:function(callback){ // 同步  获取签名
		var $this=this;
		//
		$.post('/v1/wx/getSignature', {
	        url: location.href.split('#')[0]
	    },function (res) {
	        if(res.success){
	        	var record={
	        		appId: res.appId,  // 必填，公众号的唯一标识
					timestamp:res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature // 必填，签名，见附录1
	        	};
	        	// 保存数据
	        	$.extend($this.storages,record);
	        	callback && callback(record);
	        }else{
	        	 
	        }
	        
	    }, 'json');
	},
	ready:function(callback){ //  ready事件
		var $this=this;
		// 当不是微信浏览器时
		if($this.wxVersion==''){
			callback  && callback($this);
			return;
		}
		if(!$this._initialize){
			$this.initialize();
			$this._initialize=true;
		}
		if(!$this._isCheck){ // 
			$this._readys= $this._readys || [];
			$this._readys.push(callback);
		}else{
			callback  && callback($this);
			$this.developOpen();
		}
	},
	initReady:function(){
		var $this=this,readys=$this._readys || [];
		if(!readys.length){
			return ;
		}
		readys.forEach(function(v,i){
			v && v.call(null,$this);
		});
		$this.developOpen();
	},
	developOpen:function(){ // 开放给开发者的特殊功能，以便bug修复
//		var $this=this,
//			menus=CONST.menuItem,
//			openID='',  // 当前openID
//			openIds=['okDl3jqUR7iY-ovpLHXV8DjUBlE4','okDl3jiolDzVnvZFqAMsPYCfDe5o','okDl3jun2UQ3dAAzsUjTC3WMC5Hc'];
//	 	if(openIds.indexOf(openID)!=-1){ // 是开发者，开放复制链接功能 
//	 		 $this.showMenuItems([menus.jsDebug,menus.copyUrl]);
//	 	}
	},
	fail:function(res){ // 接口调用失败时执行的回调函数。
		alert('fail 错误 ：' + JSON.stringify(res));
	},
	checkJsApi:function(jsApiList,callback){  //
		var $this=this;
		var params={
			jsApiList:jsApiList,
			success: function(res) {
				 // 以键值对的形式返回，可用的api值true，不可用为false
				 // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				callback && callback(res.checkResult);
			}    			 
		}
		wx.ready(function(){
			wx.checkJsApi(params);
		}); 
	},
	// 分享到微信好友，朋友圈、qq、微博、qq空间
	shareAll:function(ops){
		var $this=this;
		$this.shareToFriend(ops);
		$this.shareToTimeline(ops);
		$this.shareQQ(ops);
		$this.shareWeibo(ops);
		$this.shareQZone(ops);
	},
	shareToFriend:function(ops){  // 发送给微信上的好友
		var options=$.extend({
			trigger: function (res) {
//			        alert('用户点击发送给朋友');
		      },
		      success: function (res) {
//			        alert('已分享');
		      },
		      cancel: function (res) {
//			        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		},ops);
		
		wx.onMenuShareAppMessage(options);
	},
	shareToTimeline:function(ops){ // 分享到微信朋友圈
		var options=$.extend({
			  trigger: function (res) {
//		        alert('用户点击分享到朋友圈');
		      },
		      success: function (res) {
//			        alert('已分享');
		      },
		      cancel: function (res) {
//			        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		},ops);
		
		wx.onMenuShareTimeline(options);
	},
	shareQQ:function(ops){ // 分享QQ
		wx.onMenuShareQQ(ops);
	},
	shareWeibo:function(ops){ // 分享 微博
		wx.onMenuShareWeibo(ops);
	},
	shareQZone:function(ops){ // 分享  QQ空间
		wx.onMenuShareQZone(ops);
	},
	showOptionMenu:function(){  // 显示网页右上角的按钮
		wx.showOptionMenu();
	},
	hideOptionMenu:function(){ // 隐藏网页右上角的按钮
		wx.hideOptionMenu();
	},
	showAllNonBaseMenu:function(){  // 显示所有功能按钮
		wx.showAllNonBaseMenuItem();
	},
	hideAllNonBaseMenu:function(){  // 隐藏所有非基础按钮
		wx.hideAllNonBaseMenuItem();
	},
	showMenuItems:function(menuList){ // 批量显示菜单项
		wx.showMenuItems({
		    menuList: menuList // 要显示的菜单项，所有menu项见附录3
		});
	},
	hideMenuItems:function(menuList){ // 批量隐藏菜单项
		wx.hideMenuItems({
		    menuList: menuList  // 要隐藏的菜单项，所有menu项见附录3
		});
	},
	hideUnsafeMenu:function(){ // 隐藏不安全菜单项
		var menus=CONST.menuItem;
		var menuList=[
			menus.qq,
			menus.weiboApp,
			menus.facebook,
			menus.jsDebug,
			menus.copyUrl,
			menus.QQBrowser,
			menus.safari, 
			menus.email
		];
		
		this.hideMenuItems(menuList);
	},
	showShareMenu:function(){ // 显示分享按钮
		var menus=CONST.menuItem;
		var menuList=[
			menus.appMessage,
			menus.timeline,
			menus.favorite
		];
		this.showMenuItems(menuList);
	},
	getNetworkType:function(callback,flag){  // 获取网络状态
		var $this=this;
		var ops={
		    success: function (res) {
		    	// var networkType = res.networkType;  返回网络类型2g，3g，4g，wifi
		    	callback && callback(res);
		    },
		    'error':function(res){
		    	callback && callback();
		    },
		    cancel:function(res){
		    	callback && callback();
		    }
		};
		if($this.isWx()){
			wx.getNetworkType(ops);
		}else{
			ops.cancel();
		}
	},
	getLocation:function(callback,flag){  // 获取地理位置
		var $this=this;
		var ops={
		      success: function (res) {
		         callback && callback('success',res);
		      },
		      'error':function(res){
		      	callback && callback('error',res);
		      },
		      cancel:function(res){  // 取消了
//			      	$.basis.storage.set('wxLocation','cancel')
		      	callback && callback('cancel',res);
//			    	alert('cancel '+JSON.stringify(res));
		    }
		 }
		if($this.isWx()){
			wx.getLocation(ops);
		}else{
			ops.cancel();
		}
	},
	getNetLocation:function(callback,flag){ // 获取地理位置和网络
		var $this=this;
		
		if($this.netLocation){
			callback && callback($this.netLocation);
		}else{
			$this.getNetworkType(function(record){
				$this.netLocation={};
				 if(record){ $this.netLocation.networkType=record.networkType; };
				 //先取消地理位置
				/* $this.getLocation(function(res){ 
	            	if(res){
	        			$this.netLocation.latitude=res.latitude;
	        			$this.netLocation.longitude=res.longitude;
	        		}
	            	callback && callback($this.netLocation);
	        	},flag);*/
	        	
	        	callback && callback($this.netLocation);
	        	
			},flag);
		}
		
	},
	openLocation:function(ops){ // 使用微信内置地图查看位置
		
		/*
		latitude: 0, // 纬度，浮点数，范围为90 ~ -90
	    longitude: 0, // 经度，浮点数，范围为180 ~ -180。
	    name: '', // 位置名
	    address: '', // 地址详情说明
	    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
	    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
	    */
		 wx.openLocation(ops);
	},
	previewImage:function(ops){  // 预览图片
		 /* ops
		  	current: '', 当前显示的图片链接
		 	urls: []   需要预览的图片链接列表
		 */
		wx.previewImage(ops);
	},
	chooseImage:function(callback){ // 拍照或从手机相册中选图
		wx.chooseImage({
		    success: function (res) {
		    	// res.localIds 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		    	callback && callback(res);
		    }
		});
	},
	uploadImage:function(){ // 上传图片
		wx.uploadImage({
		    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    success: function (res) {
		        var serverId = res.serverId; // 返回图片的服务器端ID
		    }
		});
	},
	downloadImage:function(){ // 下载图片
		wx.downloadImage({
		    serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
		    isShowProgressTips: 1,// 默认为1，显示进度提示
		    success: function (res) {
		        var localId = res.localId; // 返回图片下载后的本地ID
		    }
		});
	},
	startRecord:function(){ // 开始录音
		wx.startRecord();
	},
	stopRecord:function(ops){ // 停止录音
		wx.stopRecord(ops);
		
		/*success: function (res) {
	        var localId = res.localId;
	    }*/
	},
	onVoiceRecordEnd:function(ops){ // 监听录音自动停止
		
//			$this.checkResult.onVoiceRecordEnd
		 
		wx.onVoiceRecordEnd(ops);
		// 录音时间超过一分钟没有停止的时候会执行 complete 回调
		/* complete: function (res) {
	        var localId = res.localId; 
	    }*/
	},
	translateVoice:function(ops){ // 识别音频并返回识别结果
		wx.translateVoice(ops);
	},
	chooseWXPay:function(ops){ // 发起一个微信支付请求
		wx.chooseWXPay(ops);
	}
});
 
 
