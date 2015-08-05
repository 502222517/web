define('app/views/home/home', function(require, exports, module){ var $=require('jquery');
var _=require('underscore');
var Backbone=require('backbone');
var Epoxy=require('epoxy/backbone.epoxy');


 
var HomeView={
	b:Backbone,
	e:Epoxy
};

window.HomeView=HomeView;

module.exports=HomeView;






 
});