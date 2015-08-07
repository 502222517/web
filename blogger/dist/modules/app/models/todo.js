define('app/models/todo', function(require, exports, module){ var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
 
 var TodoItemModel = Backbone.Model.extend({
	  defaults: {
	    todo: "",
	    complete: false
	  },
	  save:function(){
	  	console.log('save',arguments)
	  }
});

module.exports=TodoItemModel;

 
});