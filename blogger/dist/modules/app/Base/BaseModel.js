define('app/base/BaseModel', function(require, exports, module){ var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');


var BaseModel= Backbone.Model.extend({
	  defaults: {
	    complete: false
	  },
	  save:function(){   // 禁止自动保存
	  	
//	  	console.log('save',arguments)

	  }
});



 
});