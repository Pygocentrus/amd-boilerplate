/* Custom configuration files */
var conf = require('./gulp-conf');

/* Gulp plugins */
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    rename      = require("gulp-rename"),
    rev         = require('gulp-rev'),
    sass        = require('gulp-sass'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    clean       = require('gulp-clean'),
    minifyCSS   = require('gulp-minify-css'),
    autoprefix  = require('gulp-autoprefixer'),
    htmlmin     = require('gulp-htmlmin'),
    htmlreplace = require('gulp-html-replace'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    es          = require('event-stream'),
    reload      = browserSync.reload;

/* Concatenates vendor & custom styles + sass compilation */
gulp.task('styles', function () {
  var vendors = conf.styles.lib.files.map(function(fileName) { return conf.styles.lib.prefix + fileName; }),
      custom = conf.styles.custom.files.map(function(fileName) { return conf.styles.custom.prefix + fileName; }),
      cssFiles = gulp.src(vendors.concat(custom)),
      sassFiles = gulp.src(conf.paths.sass + '/*' + conf.stylesFormat);

  if (!!conf.compassConf.usesCompass) {
    /* If we use the compass framework */
    sassFiles = sassFiles.pipe(compass({
      config_file: conf.compassConf.configRbPath,
      css: conf.paths.css,
      sass: conf.paths.sass,
      image: conf.paths.images,
      require: ['reset']
    }));
  } else {
    /* Otherwise we only compile sass files */
    sassFiles = sassFiles.pipe(sass({indentedSyntax: false}));
  }

  return es.concat(cssFiles, sassFiles)
    .pipe(autoprefix({browsers: ['last 2 versions']}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(conf.paths.styles))
    .pipe(reload({stream: true}));
});

/* Dist image optimization */
gulp.task('images', function() {
  return gulp.src(conf.paths.images + '/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(conf.paths.dist + '/img'));
});

/* Dist styles minification */
gulp.task('build-styles', ['styles'], function () {
  return gulp.src(conf.paths.styles + '/main.css')
    .pipe(minifyCSS({keepSpecialComments: 0, advanced: false}))
    .pipe(rename("production.min.css"))
    .pipe(rev())
    .pipe(gulp.dest(conf.paths.dist + '/styles'))
    .pipe(rev.manifest('rev-manifest-styles.json'))
    .pipe(gulp.dest(conf.paths.dist));
});

/* Dist scripts minification */
gulp.task('build-scripts', function () {
  return gulp.src(conf.paths.dist + '/main.js')
    .pipe(rename("production.min.js"))
    .pipe(rev())
    .pipe(gulp.dest(conf.paths.dist + '/scripts'))
    .pipe(rev.manifest('rev-manifest-scripts.json'))
    .pipe(gulp.dest(conf.paths.dist));
});

/* Copy RequireJS into the dist/lib directory */
gulp.task('copy-requirejs', function () {
  return gulp.src(conf.paths.app + '/bower_components/requirejs/require.js')
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(conf.paths.dist + '/scripts/lib'));
});

/* Copy dependencies into the dist/scripts directory */
gulp.task('copy-dependencies', function () {
  return gulp.src(conf.paths.dist + '/infrastructure.js')
    .pipe(gulp.dest(conf.paths.dist + '/scripts'));
});

/* Copy htaccess file to dist folder */
gulp.task('copy-htaccess', function () {
  return gulp.src(conf.paths.app + '/.htaccess')
    .pipe(gulp.dest(conf.paths.dist));
});

/* Copy fonts to dist folder */
gulp.task('copy-fonts', function() {
  return gulp.src(conf.paths.app + '/fonts')
    .pipe(gulp.dest(conf.paths.dist + '/fonts'));
});

/* Dist html minification and file rev replacement */
gulp.task('build-html', [
  'build-styles',
  'build-scripts',
  'copy-requirejs',
  'copy-dependencies',
  'copy-htaccess',
  'copy-fonts'
], function () {
  var stylesRev = require('./'+ conf.paths.dist +'/rev-manifest-styles.json')['production.min.css'],
      scriptsRev = require('./'+ conf.paths.dist +'/rev-manifest-scripts.json')['production.min.js'];

  return gulp.src('app/index.html')
    .pipe(htmlreplace({
        css: "styles/" + stylesRev,
        js: {
          src: 'scripts/' + scriptsRev,
          tpl: '<script src="scripts/lib/require.js" data-main="%s"></script>'
        },
        base: {
          src: '/',
          tpl: '<base href="%s">'
        }
      }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(conf.paths.dist));
});

/*
  Live browserSync server, taking care of the
  styles and scripts changes automatically
 */
gulp.task('serve', ['styles'], function () {
  /* Start browsersync for socket live reload */
  browserSync({
    server: "./" + conf.paths.app
  });

  /* Watch styles */
  gulp.watch([
    conf.paths.styles + '/**/*' + conf.stylesFormat,
    conf.paths.styles + '/**/*.css',
    '!' + conf.paths.styles + '/main.css'
  ], ['styles']);

  /* Watch scripts */
  gulp.watch([
    conf.paths.scripts + '/**/*.js',
    '!' + conf.paths.scripts + '/main.js'
  ], ['styles', reload]);

  /* Watch html */
  gulp.watch(conf.paths.app + '/*.html').on('change', reload);
});

gulp.task('serve-prod', function () {
  /* Start browsersync for socket live reload */
  browserSync({
    server: "./" + conf.paths.dist
  });
});

/*
  Build task, concat & uglify + image optimization
 */
gulp.task('build', ['build-html', 'images', 'serve-prod'], function () {
  /* Then, simple dist cleaning for tmp files */
  return gulp.src([
    conf.paths.dist + '/rev-manifest-*',
    conf.paths.dist + '/build.txt',
    conf.paths.dist + '/*.js',
    conf.paths.dist + '/views',
    conf.paths.dist + '/classes'
  ], {read: false})
    .pipe(clean());
});
