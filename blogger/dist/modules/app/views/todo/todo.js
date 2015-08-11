define('app/views/todo/todo', function(require, exports, module){ var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
var Epoxy=require('epoxy/backbone.epoxy');
var TodosCollection=require('app/collections/todos');
var BaseView=require('app/Base/BaseView')

window.Backbone=Backbone;

var TodoItemView = Backbone.Epoxy.View.extend({
//template:__inline('app/templates/todo/todo.tmpl'),
	el:function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<li>\r\n\t<input type=\'checkbox\'   > \r\n\t<input type=\'text\' class=\'todo\'  >\r\n</li>';
}
return __p;
}(),
//	el:"<li><input type='checkbox'> <input type='text' class='todo'></li>",
  bindings: {
    "input[type='text']": "value:todo,readonly:complete",
    "input[type='checkbox']": "checked:complete"
  },
  initialize: function() {
     var $this=this;
  },
  bindingHandlers: {
    readonly: function( $element, value ) {
        $element.prop( "readonly", !!value );
    }
  }
});

// Epoxy View for main ToDos app:
var TodoAppView = Backbone.Epoxy.View.extend({
//template: __inline('app/templates/todo/todos.tmpl'),
  collection: new TodosCollection(),
  itemView: TodoItemView,
  el:$(function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="epoxy-todo-app">\r\n  <b>What do you need to do?</b>\r\n  <p>\r\n    <input type="text" class="todo-add">\r\n    <button class="add">Add</button>\r\n  </p>\r\n  <ul class="todos" data-bind="collection:$collection"></ul>\r\n  <button class="cleanup">Clear complete</button>\r\n</div>';
}
return __p;
}()),
  events: {
    "click .add": "onAdd",
    "click .cleanup": "onCleanup",
    "keydown .todo-add": "onEnter"
  },
  initialize: function() {
     var $this=this;
     $('#container').append($this.$el);
  }, 
  onEnter: function( evt ) {
    if ( evt.which == 13 ) this.onAdd();
  },
  onAdd: function() {
    var input = this.$(".todo-add");
    if ( input.val() ) {
    	  this.collection.add({todo: input.val()});
        input.val("");
    }
  },
  onCleanup: function() {
    _.invoke(this.collection.where({complete:true}), "destroy");
  }
});

 

module.exports=TodoAppView;
 
});