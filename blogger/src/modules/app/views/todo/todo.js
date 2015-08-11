var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
var Epoxy=require('epoxy/backbone.epoxy');
var TodosCollection=require('app/collections/todos');
var BaseView=require('app/Base/BaseView')

window.Backbone=Backbone;

var TodoItemView = Backbone.Epoxy.View.extend({
//template:__inline('app/templates/todo/todo.tmpl'),
	el:__inline('app/templates/todo/todo.tmpl')(),
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
  el:$(__inline('app/templates/todo/todos.tmpl')()),
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
