'use strict';

var gulp = require('gulp'),
    rev = require('gulp-rev'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    ngConstant = require('gulp-ng-constant'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    gulpIf = require('gulp-if');


var handleErrors = require('./gulp/handle-errors'),
    serve = require('./gulp/serve'),
    util = require('./gulp/utils'),
    copy = require('./gulp/copy'),
    inject = require('./gulp/inject'),
    build = require('./gulp/build');

var config = require('./gulp/config');

gulp.task('clean', function () {
    return del([config.dist], { dot: true });
});

gulp.task('copy', ['copy:fonts', 'copy:common']);

gulp.task('copy:fonts', copy.fonts);

gulp.task('copy:libs', copy.libs);

gulp.task('copy:download', copy.download);

gulp.task('copy:common', copy.common);

gulp.task('copy:swagger', copy.swagger);

gulp.task('copy:images', copy.images);

gulp.task('images', function () {
    return gulp.src(config.app + 'content/images/**')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/images'))
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/images'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('styles', [], function () {
    return gulp.src(config.app + 'content/css')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('inject', function() {
    runSequence('inject:dep', 'inject:app');
});

gulp.task('inject:dep', ['inject:test', 'inject:vendor']);

gulp.task('inject:app', inject.app);

gulp.task('inject:vendor', inject.vendor);

gulp.task('inject:test', inject.test);

gulp.task('inject:troubleshoot', inject.troubleshoot);

gulp.task('assets:prod', ['images', 'styles', 'html', 'copy:swagger', 'copy:images', 'copy:libs', 'copy:download'], build);

gulp.task('html', function () {
    return gulp.src(config.app + 'app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({
            module: 'app',
            root: 'app/',
            moduleSystem: 'IIFE'
        }))
        .pipe(gulp.dest(config.tmp));
});

gulp.task('ngconstant:dev', function () {
    var constantsConfig = require('./' + config.app + 'app/app.constants.json');

    var APP_CONFIG = constantsConfig.common || {};
    util.extend(APP_CONFIG, constantsConfig.dev);
    var constants = {APP_CONFIG: APP_CONFIG};

    return ngConstant({
        name: constantsConfig.moduleName,
        template: config.constantTemplate,
        constants: constants,
        stream: true
    })
        .pipe(rename('app.constants.js'))
        .pipe(gulp.dest(config.app + 'app/'));
});

gulp.task('ngconstant:prod', function () {
    var constantsConfig = require('./' + config.app + 'app/app.constants.json');

    var APP_CONFIG = constantsConfig.common || {};
    util.extend(APP_CONFIG, constantsConfig.prod);
    var constants = {APP_CONFIG: APP_CONFIG};

    return ngConstant({
        name: constantsConfig.moduleName,
        template: config.constantTemplate,
        constants: constants,
        stream: true
    })
    .pipe(rename('app.constants.js'))
    .pipe(gulp.dest(config.app + 'app/'));
});

// check app for eslint errors
gulp.task('eslint', function () {
    return gulp.src(['gulpfile.js', config.app + 'app/**/*.js'])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// check app for eslint errors anf fix some of them
gulp.task('eslint:fix', function () {
    return gulp.src(config.app + 'app/**/*.js')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(gulpIf(util.isLintFixed, gulp.dest(config.app + 'app')));
});

gulp.task('watch', function () {
    gulp.watch('bower.json', ['install']);
    gulp.watch(['gulpfile.js'], ['ngconstant:dev']);
    gulp.watch(config.app + 'content/css/**/*.css', ['styles']);
    gulp.watch(config.app + 'content/images/**', ['images']);
    gulp.watch(config.app + 'app/**/*.js', ['inject:app']);
    gulp.watch([config.app + '*.html', config.app + 'app/**', config.app + 'i18n/**']).on('change', browserSync.reload);
});

gulp.task('install', function () {
    runSequence(['inject:dep', 'ngconstant:dev'], 'inject:app', 'inject:troubleshoot');
});

gulp.task('serve', ['install'], serve);

gulp.task('build', ['clean'], function (cb) {
    runSequence(['copy', 'inject:vendor', 'ngconstant:prod'], 'inject:app', 'inject:troubleshoot', 'assets:prod', cb);
});

gulp.task('default', ['serve']);
