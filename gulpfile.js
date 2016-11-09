var gulp = require('gulp');
var gutil = require('gulp-util');
var os = require('os');
var chalk = require('chalk');
var del = require('del');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', ['usage']);

gulp.task('usage', function() {
    "use strict";

    var usageLines = [
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
    "use strict";

    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('serve', function() {
    "use strict";

    nodemon({
        script: 'server/server.js',
        watch: 'server/server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('build', ['copyfiles', 'buildjsx']);

gulp.task('watch', ['build'], function() {
    "use strict";

    gulp.watch('src/**/*.jsx', ['buildjsx']);
});

gulp.task('copyfiles', function() {
    "use strict";

    gulp.src([
        'src/**/*',
        '!src/**/*.jsx'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('buildjsx', function() {
    "use strict";

    return browserify({
        entries: 'src/bootstrap.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
    "use strict";

    return del('dist');
});

gulp.task('clean:modules', function() {
    "use strict";

    return del('node_modules');
});

gulp.task('clean:all', ['clean:dist', 'clean:modules']);

gulp.task('clean', ['clean:dist']);
