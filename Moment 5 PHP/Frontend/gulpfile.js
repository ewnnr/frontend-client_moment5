const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');


//Objekt för att hämta sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    sassPath: "src/sass/*.scss",
    jsPath: "src/JS/*.js",
    imagePath: "src/images/*"
}

//HTML-task, kopierar över alla html-filer till pub-katalogen
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('public'));
}

function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(dest('public/JS'));
}
exports.default = copyHTML, jsTask;

function cssTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat('main.css'))

    .pipe(dest('public/css'))

}

exports.default = parallel(copyHTML, cssTask, jsTask)