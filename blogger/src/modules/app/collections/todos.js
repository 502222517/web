var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
var TodoItemModel=require('app/models/todo');


var TodosCollection = Backbone.Collection.extend({
  model: TodoItemModel
});


module.exports=TodosCollection;

