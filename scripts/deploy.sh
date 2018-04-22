#删除上一个版本
rm -rf _deployme
mkdir _deployme

#构建
sh scripts\build.sh

#压缩JavaScript
uglify -s bundle.js -o _deployme\bundle.js
#压缩css
cssshrink bundle.css > _deployme\bundle.css
#复制html和图片
cp index.html _deployme\index.html
cp -r images\ _deployme\images

#完成
date;echo;