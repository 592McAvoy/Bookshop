#转换js
babel --presets react,es2015 js\source -d js\build
#打包js
browserify js\build\app.js -o src\main\webapp\bundle.js
#打包css
type css\components\* css\* > WebContent\bundle.css
#完成
date;echo;