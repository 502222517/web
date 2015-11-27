module.exports=function(grunt){
	// project configuration
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		meta:{
			basePath:'../src/',
			destPath:'../'
		},
        // 代码清理
		clean:{
			options:{
				force:true
			},
			images:{
				expand: true,
				cwd: '<%=meta.destPath%>images/',
				src: ['**/**.jpg','**/**.png','**/**.gif']
			}
		},
		copy:{
			images:{
				files:[{
				 	expand: true,
					cwd: '<%=meta.basePath%>images/', 
					src: ['**/**.jpg','**/**.png','**/**.gif'],
					dest: '<%=meta.destPath%>images/'
				}]
			},
			htmls:{
				files:[{
					expand: true,
					cwd: '<%=meta.basePath%>', 
					src: ['**/**.html'],
					dest: '<%=meta.destPath%>'
				}]
			}
		},
		htmlmin:{
			dist:{
			   options:{
					removeComments: true, // 去注析
					collapseWhitespace: true // 去换行
				},
				files:[
					{
						expand:true,
						cwd:'<%=meta.destPath%>html/',
						src:['**/*.html'],
						dest:'<%=meta.destPath%>html/',
						ext:'.html'
					}
				]  
			}
		},
		watch:{
			images:{  
				files: ['<%=meta.basePath%>images/**/**.jpg'
				,'<%=meta.basePath%>images/**/**.png'
				,'<%=meta.basePath%>images/**/**.gif'],
				tasks:['clean:images','copy:images']
			}
		}
	});

	// 加载任务插件
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
 
	// 默认被执行的任务列表  ,'clean:temp' 
	grunt.registerTask('default',['clean','copy','htmlmin']);
	
    // 开发打包
	grunt.registerTask('dev',['clean','copy','watch']);
    
 
}