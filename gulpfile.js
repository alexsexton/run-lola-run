// Gulp.js configuration

// Modules
var gulp = require('gulp')
var newer = require('gulp-newer')

// Clean HTML
// var htmlclean = require('gulp-htmlclean')

// Optimise images and SVG
var imagemin = require('gulp-imagemin')
var svgmin = require('gulp-svgmin')

// require
// var rjs = require('gulp-requirejs')

// JS Tasks
var concat = require('gulp-concat')
var deporder = require('gulp-deporder')
var stripdebug = require('gulp-strip-debug')
var uglify = require('gulp-uglify')

// Sass Modules
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var assets = require('postcss-assets')
var autoprefixer = require('autoprefixer')
var mqpacker = require('css-mqpacker')
var cssnano = require('cssnano')

// development mode?
var devBuild = (process.env.NODE_ENV !== 'production')

var folder = {
  src: 'src/',
  build: 'assets/'
}

// image processing
gulp.task('images', function () {
  var out = folder.build
  return gulp.src(folder.src + 'images/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out))
})

// SVG min
gulp.task('svgmin', function () {
  var out = folder.build
  return gulp.src(folder.src + 'images/*')
    .pipe(svgmin())
    .pipe(gulp.dest(out))
})

// HTML Cleas

// gulp.task('html', ['images'], function () {
//   var out = folder.build + 'html/'
//   var page = gulp.src(folder.src + 'html/**/*')
//     .pipe(newer(out))
//
//   // minify production code
//   if (!devBuild) {
//     page = page.pipe(htmlclean())
//   }
//
//   return page.pipe(gulp.dest(out))
// })

// CSS processing
gulp.task('css', ['images'], function () {
  var postCssOpts = [
    assets({ loadPaths: ['assets/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ]

  if (!devBuild) {
    postCssOpts.push(cssnano)
  }

  return gulp.src(folder.src + 'scss/styles.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build))
})

// require

// JavaScript processing
gulp.task('js', function () {
  var jsbuild = gulp.src([
    folder.src + 'js/lib/*',
    folder.src + 'js/plugins/*',
    folder.src + 'js/*'
  ]) // <- Multiple files need to go in an array
    .pipe(deporder())
    .pipe(concat('main.js'))

  // if (!devBuild) {
  //   jsbuild = jsbuild
  //     .pipe(stripdebug())
  //     .pipe(uglify())
  // }

  jsbuild = jsbuild
    .pipe(stripdebug())
    .pipe(uglify())

  return jsbuild.pipe(gulp.dest(folder.build))
})

// run all tasks
gulp.task('run', ['images', 'css', 'js'])

// watch for changes
gulp.task('watch', function () {
  // image changes
  gulp.watch(folder.src + 'images/**/*', ['images'])
  // javascript changes
  gulp.watch(folder.src + 'js/**/*', ['js'])
  // css changes
  gulp.watch(folder.src + 'scss/**/*', ['css'])
})

// default task
gulp.task('default', ['run', 'watch'])
