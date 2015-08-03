/*
 * fis 配置文件 
 * 参考 http://fis.baidu.com/docs/api/fis-conf.html
 */

// fis内部 默认设置  
/*fis.config.init({
	project:{
		charset:'utf8',
		md5Length:7,
		md5Connector:'_',
		exclude:/^\/_build\//i
	}
});*/

// set 配置
fis.config.set('project.charset','utf8');

// merge project 配置
fis.config.merge({
	project:{
		exclude:[/^\/output\//i,/^\/components\//i,'README.md'], // _build  为生成目录 
		fileType:{
			text:'tpl,md'
		},
		watch:{
			usePolling:false // 解释：设置项目源码监听的方式， usePolling 为 true 时会使用轮询的方式检查文件是否被修改，比较消耗CPU，但是适用场景更广。设置为 false 后会使用系统API进行文件修改检查，对性能消耗较小，但是可能由于系统版本不同，会存在兼容性问题。
		},
		modules:{
			preprocessor:{
//				 css : 'annotate',  // css后缀文件会经过  fis-preprocessor-annotate 插件的预处理
				 css : 'image-set'  // css后缀文件会经过fis-preprocessor-image-set插件的预处理
			}
		},
		lint:{
			js:'jshint'  // js后缀文件会经过fis-lint-jshint插件的代码校验检查
		},
		test:{  // 单文件编译过程中的自动测试插件
            js:'phantomjs' // js后缀文件会经过fis-test-phantomjs插件的测试
		}
	}
});

// roadmap 配置
fis.config.merge({
	roadmap:{
//		domain : 'http://s1.example.com, http://s2.example.com'  // 所有静态资源文件都使用 http://s1.example.com 或者 http://s2.example.com 作为域名
	   /* domain:{
	    	//widget目录下的所有css文件使用 http://css1.example.com 作为域名
            'widget*.css' : 'http://css1.example.com',
            //所有的js文件使用 http://js1.example.com 或者  http://js2.example.com 作为域名
            '**.js' : ['http://js1.example.com', 'http://js2.example.com'],
             //所有图片文件，使用 http://img.example.com 作为域名
            'image' : ['http://img.example.com']
	    },*/
	 /*   path:{
	    	reg:/^\/components\/.*\.js$/i,
	    	isMod:true,
	    	jswrapper:{
	    		type:'amd'
	    	}
	    }*/
	}
});
 
// deploy 配置
fis.config.merge({
	deploy:{
		// 远程  使用fis release --dest remote来使用这个配置
		remote:{ 
			// 如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://www.example.com/path/to/receiver.php',
            // 从产出的结果的static目录下找文件
            from : '/static',
            // 保存到远端机器的/home/fis/www/static目录下
            // 这个参数会跟随post请求一起发送
            to : '/home/fis/www/',
            //通配或正则过滤文件，表示只上传所有的js文件
            include : '**.js',
            // widget目录下的那些文件就不要发布了
            exclude : /\/widget\//i,
            // 支持对文件进行字符串替换
            replace : {
                from : 'http://www.online.com',
                to : 'http://www.offline.com'
            }
		},
        local : {  //名字随便取的，没有特殊含义
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '/output'
        }
	}
});







