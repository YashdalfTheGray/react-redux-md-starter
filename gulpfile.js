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
const babel = require('gulp-babel');

gulp.task('default', ['usage']);

gulp.task('usage', () => {
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

gulp.task('start', ['build'], () => {
    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('serve', () => {
    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('build', ['copyfiles', 'buildjs']);

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/**/*.jsx', 'src/**/*.js'], ['buildjs']);
});

gulp.task('copyfiles', () => {
    return gulp.src([
        'src/**/*',
        '!src/**/*.jsx',
        '!src/**/*.js'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('buildjs', () => {
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

gulp.task('test', ['testbuild'], () => {
    return gulp.src(['test/**/*.spec.js', 'server/**/*.spec.js'])
    .pipe(tape({
        reporter: tapMin()
    }));
});

gulp.task('testbuild', ['clean:test'], () => {
    return gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('test/client'));
});

gulp.task('lint', () => {
    return gulp.src(['server/**/*.js', 'src/**/*.jsx', 'src/**/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean:dist', () => {
    return del('dist');
});

gulp.task('clean:test', () => {
    return del('test');
});

gulp.task('clean:modules', () => {
    return del('node_modules');
});

gulp.task('clean:all', ['clean:dist', 'clean:modules']);

gulp.task('clean', ['clean:dist']);
