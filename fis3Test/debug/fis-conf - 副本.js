/**
 * fis3 配置文件 
 */

var CONSTANT={
	REMOTE_WEBROOT_PATH: '../',
	PRODUCT_PATH: '../dist', // 请勿随意修改
	DEBUG_PATH: '../debug', // debug
	IS_DEBUG:true
}

 

// 设置本地 debug路径
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
  	from: '/',
    to: CONSTANT.DEBUG_PATH 
  })
})
/*
// 设置本地 prod路径 (生产环境)
fis.media('prod').match('*', {
  deploy: fis.plugin('local-deliver', {
    to: CONSTANT.PRODUCT_PATH 
  })
});
 
// 设置远程服务器上传路径
fis.media('server').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://zhanghenghui.com/php/receiver.php',
    to: '../' // 注意这个是指的是测试机器的路径，而非本地机器
  })
});
*/
// 
fis.match('index.html', {
  release: CONSTANT.REMOTE_WEBROOT_PATH+'$0' //,
   //访问url是/mm/static/js/xxx
//  url : CONSTANT.DEBUG_PATH+'$0'
})
 
// 对 CSS 进行图片合并
fis.match('./css/**.css',{
	// 给匹配到的文件分配属性 `useSprite`
	useSprite:true 
});


// fis-parser-less
fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});
// 判断是否是调试
if(!CONSTANT.IS_DEBUG){
	fis.match('*.js', {
	  optimizer: fis.plugin('uglify-js')
	});
	
	fis.match('*.{css,less}', {
	  optimizer: fis.plugin('clean-css')
	});
	
	fis.match('*.png', {
	  optimizer: fis.plugin('png-compressor')
	});
}

// 所有js, css 加 hash  开启 md5 戳
fis.match('*.{js,css,less}', {
  useHash: true
});
// 所有图片加 hash
fis.match('image', {
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package',{
	spriter:fis.plugin('csssprites')
});

// 启用插件
fis.hook('relative');
// 让所有文件，都使用相对路径。
fis.match('**', {
  relative: true
})
 
//fis3-hook-module
fis.hook('module', {
    mode: 'commonJS'
});

// fis-conf.js
//fis.match('*.html', {
//  useMap: true
//});
// 


// 设置排除文件
fis.set('project.ignore', ['*.bak','*.bat','fis-conf.js','package.json']);

// 设置根路径
fis.set('component.dir', '/modules');
//
fis.config.set('statics', CONSTANT.PRODUCT_PATH);







