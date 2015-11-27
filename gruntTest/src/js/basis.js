(function(window, document,$){
	'use strict';
	var basis={
		isMeilifApp:function(){
			// meilif/2.6 
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.indexOf("meilif")>-1){
				return true;
			}else{
				return false;
			}
		},
		isWeiXin:function(){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.indexOf("micromessenger")>-1){
				return true;
			}else{
				return false;
			}
		},
		setIOSWxTitle:function(title){  // 解决Ios系统，微信网页title不能重新设置
			var $body = $('body');
				document.title = title;
			// hack在微信等webview中无法修改document.title的情况
			var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
			        setTimeout(function(){
			        $iframe.off('load').remove()
			        }, 1);
			}).appendTo($body);
		},
		getOS:function(){
			var $this=this;
			if(!$this._os){
                var ua = navigator.userAgent,
                        platform = navigator.platform,
                        os = null;

                if (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1 || platform.indexOf("iPod") > -1) {
                    os = "ios";
                } else if (ua.indexOf("Android") > -1) {
                    os = "android";
                } else {
                    os = 'other';
                }
                $this._os=os;
            }
            return $this._os;
		},
		navigate:function(_url,isReplace){
			if(isReplace){
				window.location.replace(_url);
			}else{
				window.location.href=_url;	
			}
		},
		getUrlParam:function(name){  //获取url参数
	        var paramsText= window.location.search;
	        if(typeof name !=='undefined'){
	            var regex = new RegExp("[\\?&]"+name+"=([^&#]*)&?",["i"]);
	            var qs = regex.exec(paramsText);
	            return qs ? qs[1] : '';
	        }
	        if(!paramsText.length){
	        	return {};
	        }
	        //获取所有参数
	        var arrs=paramsText.substring(1).split('&'),param={},items;
	        for(var i= 0,len=arrs.length;i<len;i++){
	            items=arrs[i].split('=');
	            param[items[0]]=items[1]
	        }
	        return param;
	   },
	   setUrlParam:function(url,name,value){  //设置url参数 存在替换，不存在添加
            var regex = new RegExp("([\\?&]"+name+"=)([^&#]*)&?",["i"])
                ,match = regex.exec(url)
                ,temp='',index=-1;

                if(match == null)
                {
                    temp=(url.indexOf('?')>-1 ? '&':'?')+name+'='+value;
                    return url.indexOf('#')>-1 ? url.replace('#',temp+'#') :url+temp;
                }
                else
                {
                   return url.replace(regex,'$1' + value + '&');
                }
       },
       get:function(url,data,callback,noTip,tipMsg,showImg){
       		var $this=this;
	   		$this.ajax('get',url,data,callback,noTip,tipMsg,showImg);
       },
	   post:function(url,data,callback,noTip,tipMsg,showImg){
	   		var $this=this;
	   		$this.ajax('post',url,data,callback,noTip,tipMsg,showImg);
	   },
	   ajax:function(httpType,url,data,callback,noTip,tipMsg,showImg){
	   		var $this=this;
	   		data= data || {};
	   		if(!noTip) tips.show(tipMsg,showImg);
	   		// h5 固定标识
	   		data.ckey= 'HY25OR9C1E8M';
	   		data.r=Math.random();
	   		// app 内嵌时加上Authorization头
	   		var auth= window.sessionStorage.getItem('auth');
	   		//
	   		$.ajax({
	   			type:httpType,
	   			url:url,
	   			data:data,
	   			dataType:'json',
	   			beforeSend: function (xhr) {
	   				if(auth){
	   					auth=decodeURIComponent(auth);
	   					xhr.setRequestHeader("Authorization" ,auth);
	   				}
		        },
	   			success:function(res,textStatus,xhr){
	   				if(!noTip) tips.hide();
	   				if(res.code=='0'){
						callback && callback(true,res);
					}else{
						// 判断是否是因为没有登录而报错
						if($this.checkLogin(res)) return;
						basis.tips.show(res.msg).hide(3000);
						callback && callback(false,res);
					}
	   			},
	   			error:function(jqXHR,textStatus,errorThrown ){
	   				if(!noTip) tips.hide();
	   				// 401 如果是app内嵌，返回到app
	   				if(jqXHR.status==401 && auth.length){
	   					window.location.href=common.backToAPP;
	   				}
	   				// 超时处理
		    		if(textStatus=='timeout'){
		    			tips.show('连接不上服务了，请检查下您的网络!').hide(3000);
		    		}else{
		    			var ctx=jqXHR.responseText.slice(0,200);
		    			basis.tips.show('遇到错误('+jqXHR.status+')：'+ctx).hide(3000);
		    		}
					callback && callback(false);
				}
	   		});
	   },
	   checkLogin:function(res){ // 未登录，跳转到登录页面
	   		var $this=this;
	   		if(res.code=='-9002'){
	   			var _url=encodeURIComponent(window.location.href);
	   			var loginUrl='/apph5/html/user/login.html?url='+_url;
	   			var ms=1000;
	   			basis.tips.show('请先登录！').hide(ms);
	   			setTimeout(function(){
	   				basis.navigate(loginUrl);
	   			},ms);
	   			return true;
	   		}
	   },
	   clear:function(timer){
	   		var $this=this;
	   		timer = timer || 1000;
	   		$('body').addClass('no-event');
	   		setTimeout(function(){
	   			$('body').removeClass('no-event')	
	   		},timer);
	   }
	}
	
	// mask
	var Mask=function(){
		var $this={};
		$this.$el=$('#mask');
		if(!$this.$el.length){
			$this.$el=$('<div id="mask"></div>');
			$('body').append($this.$el);
		}
		$this.eventNames=[];
		
		$this.show=function(during){
			$this.$el.fadeIn(during);
			return $this;
		}
		$this.hide=function(during){
			$this.$el.fadeOut(during);
			return $this;
		}
		// 绑定事件 click
		$this.on=function(eventName,handler){
			eventName =eventName || 'click';
			if($.isFunction(handler)){
				$this.eventNames.push(eventName);
				$this.$el.on(eventName,handler);
			}
			return $this;
		}
		// 移除事件
		$this.off=function(eventName){
			$this.$el.off(eventName);
			var index=$this.eventNames.indexOf(eventName);
			$this.eventNames.splice(index,1);
			return $this;
		}
		// 恢复为初始化状态
		$this.destroy=function(){
			// 移除事件
			while($this.eventNames.length){
				$this.$el.off($this.eventNames.shift());
			}
			$this.hide();
			return $this;
		}
		
		return $this;
	}
	
	basis.mask=new Mask();
	 
	var tips={
		initialize:function(){
			var $this=this;
			$this.el=$('#tips');
			if(!$this.el.length){
				$this.el=$("<div id='tips' class='position-middle'><div class='msg-box'><div class='loading-img'></div><div class='msg' id='tips-msg'>加载中...</div></div></div>");
				$('body').append($this.el);
			}
			$this.oTipMsg = $this.el.find('#tips-msg');
    		$this.oTipImg = $this.el.find('.loading-img');
		},
		show:function(msg,showImg){
			var $this=this;
			$this.initialize();
			msg && $this.oTipMsg.html(msg);
			showImg ? $this.oTipImg.show() : $this.oTipImg.hide();
			$this.el.show();
			return $this;
		},
		hide:function(delay){
			var $this=this;
			$this.initialize();
			if($this.timer){
				window.clearTimeout($this.timer);				
			}
			if(delay){
				$this.timer=setTimeout(function(){
		    		$this.el.hide();
		    	},delay);
		    }else{
		    	$this.el.hide();
		    }
			return $this;
		}
	}
	
	basis.tips=tips;
	
	// app 设置
	basis.app={
		toDownloadUrl:function(){
			var version =basis.getUrlParam('isAppStoreVersion');
			var _url=common.APPURL;
			if(version){
				_url=basis.setUrlParam(_url,'isAppStoreVersion',version);
			}
			window.location.href =_url;
		}
	}
	 
	window.basis=basis;
})(window, document,jQuery);


