define('app/main', function(require, exports, module){ var Backbone = require('backbone');
var Workspace = require('app/routers/router');
var Json=require('json');

 
Backbone.$ = require('jquery');

new Workspace();
Backbone.history.start(); 
});