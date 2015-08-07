define('app/routers/router', function(require, exports, module){ var Backbone, Workspace;

Backbone = require('backbone');

/**
 * 路由配置
 * Backbone.history.navigate('',{trigger: true,replace:true});
 * trigger：是否触发事件
 * replace：替换当前hash，不产生历史记录
 */
 
Workspace = Backbone.Router.extend({
	routes:(function(){
		
		var routes={
			'':'index',  // 首页
			'todo':'todo',
			
			'*filter': 'setFilter'
		};
		
		return routes;
		
	})(),
	initialize:function(){
		var $this=this;
		
	},
	clear:function(){  // 视图切换清理
		 var $this=this;
		 
	},
	setFilter: function (param) {
		console.log('filter',param);
	},
	index:function(){
	    var $this=this;
	    var HomeView=require('app/views/home/home');
	    
	    var view=new HomeView();
	},
	todo:function(){
		var TodoView=require('app/views/todo/todo');
	    
	    var view=new TodoView();
	}
});

module.exports = Workspace; 
});