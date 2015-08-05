
var $=require('jquery');
var Backbone = require('backbone');
var Workspace = require('app/routers/router');
var Json=require('json');

 
Backbone.$ = $;

new Workspace();
Backbone.history.start();