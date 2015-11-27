echo "首次执行npm install grunt 插件安装"
echo "安装grunt插件并保存插件信息到package.json"

npm install grunt --save-dev
echo "grunt安装 完成"

cmd /k npm install grunt-contrib-jshint --save-dev
echo "grunt-contrib-jshint安装 完成"

cmd /k npm install grunt-contrib-clean --save-dev
echo "grunt-contrib-clean安装 完成"

cmd /k npm install grunt-contrib-concat --save-dev
echo "grunt-contrib-concat安装 完成"

cmd /k npm install grunt-contrib-copy --save-dev
echo "grunt-contrib-copy安装 完成"

cmd /k npm install grunt-contrib-cssmin --save-dev
echo "grunt-contrib-cssmin安装 完成"

cmd /k npm install grunt-contrib-htmlmin --save-dev
echo "grunt-contrib-htmlmin 安装 完成"

cmd /k npm install grunt-contrib-less --save-dev
echo "grunt-contrib-less"

cmd /k npm install grunt-contrib-uglify --save-dev
echo "grunt-contrib-uglify"

cmd /k npm install grunt-contrib-watch --save-dev
echo "grunt-contrib-watch安装 完成"

pause






