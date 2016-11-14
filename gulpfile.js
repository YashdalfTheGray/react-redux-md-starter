"use strict";

const gulp = require('gulp');
const gutil = require('gulp-util');
const os = require('os');
const chalk = require('chalk');
const del = require('del');
const nodemon = require('gulp-nodemon');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const eslint = require('gulp-eslint');
const tape = require('gulp-tape');
const tapMin = require('tap-min');

gulp.task('default', ['usage']);

gulp.task('usage', function() {
    const usageLines = [
        '',
        '',
        chalk.green('usage'),
        '\tdisplay this help page.',
        '',
        chalk.green('start'),
        '\truns ' + chalk.green('build') + ' and starts the server on port 8080.',
        '',
        chalk.green('serve'),
        '\tserves up the dist folder, useful when run with ' + chalk.green('watch') + '.',
        '',
        chalk.green('build'),
        '\tbuild all the .jsx files into ' + chalk.cyan('dist/bundle.js') + '.',
        '',
        chalk.green('watch'),
        '\twatch for changes and run the ' + chalk.green('build') + ' task on changes.',
        '',
        chalk.green('test'),
        '\truns any tape tests found in the project.',
        '',
        chalk.green('lint'),
        '\truns all the source files including ' + chalk.cyan('gulpfile.js') + ' through eslint.',
        '',
        chalk.green('clean:dist'),
        '\tdeletes the dist folder.',
        '',
        chalk.green('clean'),
        '\talias for ' + chalk.green('clean:dist') + '.',
        '',
        chalk.green('clean:modules'),
        '\tdeletes the npm_modules directory.',
        '\t' + chalk.magenta('NOTE:') + ' ' + chalk.green('npm install') +
        ' will be required before running the app.',
        '',
        chalk.green('clean:all'),
        '\truns both ' + chalk.green('clean:dist') + ' and ' + chalk.green('clean:modules') + '.',
        ''
    ];
    gutil.log(usageLines.join(os.EOL));
});

gulp.task('start', ['build'], function() {
    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('serve', function() {
    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('build', ['copyfiles', 'buildjsx']);

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.jsx', ['buildjsx']);
});

gulp.task('copyfiles', function() {
    return gulp.src([
        'src/**/*',
        '!src/**/*.jsx'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('buildjsx', function() {
    return browserify({
        entries: 'src/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
    return gulp.src(['src/**/*.spec.js', 'server/**/*.spec.js'])
    .pipe(tape({
        reporter: tapMin()
    }));
});

gulp.task('lint', function() {
    return gulp.src(['server/**/*.js', 'src/**/*.jsx', 'src/**/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean:dist', function() {
    return del('dist');
});

gulp.task('clean:modules', function() {
    return del('node_modules');
});

gulp.task('clean:all', ['clean:dist', 'clean:modules']);

gulp.task('clean', ['clean:dist']);
