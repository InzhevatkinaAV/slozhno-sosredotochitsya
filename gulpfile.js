const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 

function html() {
      return gulp.src('src/**/*.html')
            .pipe(plumber())
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
    } 
  
exports.html = html; 

function css() {
    return gulp.src('src/styles/**/*.css')
          .pipe(plumber())
          .pipe(concat('style.css'))
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));

}
  
exports.css = css; 

function images() {
      return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
                .pipe(gulp.dest('dist/images'))
                .pipe(browserSync.reload({stream: true}));
}
    
exports.images = images; 

function fonts() {
      return gulp.src('src/fonts/**/*.{css,woff}')
                .pipe(gulp.dest('dist/fonts'))
                .pipe(browserSync.reload({stream: true}));
}
    
exports.fonts = fonts; 

function scripts() {
      return gulp.src('src/scripts/**/*.js')
                .pipe(gulp.dest('dist/scripts'))
                .pipe(browserSync.reload({stream: true}));
}
    
exports.scripts = scripts; 

function clean() {
      return del('dist');
}
    
exports.clean = clean; 

const build = gulp.series(clean, gulp.parallel(html, css, images));

exports.build = build; 

function watchFiles() {
      gulp.watch(['src/**/*.html'], html);
      gulp.watch(['src/blocks/**/*.css'], css);
      gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
      gulp.watch(['src/fonts/**/*.{css,woff}'], images);
      gulp.watch(['src/scripts/**/*.js'], images);
}
const watchapp = gulp.parallel(build, watchFiles, serve); 
    
exports.watchapp = watchapp; 

function serve() {
      browserSync.init({
            server: {
                  baseDir: './dist'
            }
      });
} 

exports.default = watchapp; 