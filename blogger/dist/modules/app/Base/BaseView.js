define('app/Base/BaseView', function(require, exports, module){ var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
var Epoxy=require('epoxy/backbone.epoxy');

var BaseView=Backbone.Epoxy.View.extend({
	initialize:function(){
		var $this=this;
		$this.$header=$('#header');
		$this.$container=$('#container');
		$this.$footer=$('#footer');
		$this.init();
	},
	init:function(){ // 
		
	},
	install:function(){
		
	},
	uninstall:function(){
		
	}
});

module.exports=BaseView;




 
});