/**
 * fis3 配置文件 
 */

var CONSTANT={
	REMOTE_WEBROOT_PATH: '../',
	PRODUCT_PATH: '../dist', // 请勿随意修改
	DEBUG_PATH: '../debug', // debug
	IS_DEBUG:true
}

// 设置排除文件
fis.config.set('project.ignore', ['*.bak','*.bat','fis-conf.js','package.json']);

  
// 设置本地 debug路径
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
  	from: '/',
    to: CONSTANT.DEBUG_PATH
  })
});

fis.match('/modules/*.js',{
	isMod: true // 标记匹配文件为组件
})

fis.match('*.html', {
	release:CONSTANT.REMOTE_WEBROOT_PATH+'$0'
});
    
/*
// 启用插件
fis.hook('relative');
// 让所有文件，都使用相对路径。
fis.match('**', {
  relative: true
})
 */


//fis3-hook-module
fis.hook('module', {
    mode: 'commonJS'
});
 





 





