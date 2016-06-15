var gulp = require('gulp');
var makeItFaster = require('spawn-task-experiment').spawn;

var all_jsx_tasks = [];
var all_less_tasks = [];
var all_html_tasks = [];

function createJsxTask(task) {

    function buildJSX() {
        // modules
        var gulp = require('gulp');
        var browserify = require('browserify');
        var babelify = require('babelify');
        var uglify = require('gulp-uglify');
        var source = require('vinyl-source-stream');
        var buffer = require('vinyl-buffer');
        var gutil = require('gulp-util');
        // arguments
        var task = "__task__";
        // building
        var entry = task.replace(/^dbg_/, "");
        var debug = task.substr(0, 4) === "dbg_";
        var bundler = browserify({
            entries: 'jsx/' + entry + '.jsx',
            extensions: ['.jsx'],
            paths: ['./jsx/'],
            debug: debug,
        })
        .transform(babelify, {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties'],
        })
        .bundle()
        .pipe(source(task + '.js'))
        .pipe(buffer())
        .pipe(debug ? gutil.noop() : uglify())
        .pipe(gulp.dest('../dist/js'));
        return bundler;
    }

    all_jsx_tasks.push("js_" + task);
    var str_func = buildJSX.toString()
        .replace("__task__", task);
    gulp.task("js_" + task, makeItFaster(str_func));
}


function createLessTask(task) {

    function buildLess() {
        // modules
        var LessPluginCleanCSS = require('less-plugin-clean-css'),
            LessPluginAutoPrefix = require('less-plugin-autoprefix'),
            cleancss = new LessPluginCleanCSS({ advanced: true }),
            autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });
        var gulp = require('gulp');
        var less = require('gulp-less');
        var concat = require('gulp-concat');
        // arguments
        var task = "__task__";
        // building
        return gulp.src("less/" + task + ".less")
            .pipe(less({
                plugins: [autoprefix, cleancss],
                paths: ["less/"],
            }))
            .pipe(concat(task + ".css"))
            .pipe(gulp.dest("../dist/css"));
    }

    all_less_tasks.push("css_" + task);
    var str_func = buildLess.toString()
        .replace("__task__", task);
    gulp.task("css_" + task, makeItFaster(str_func));
}


function createHtmlTask(task) {
    all_html_tasks.push("html_" + task);
    gulp.task("html_" + task, function() {
        return gulp.src("html/" + task + ".html")
            .pipe(gulp.dest("../dist"))
    });
}

createJsxTask('dbg_test');
createJsxTask('dbg_visualizer');
createJsxTask('visualizer');

createHtmlTask('test');
createHtmlTask('visualizer');
createHtmlTask('visualizer_dbg');

createLessTask('visualizer')

gulp.task('js', gulp.parallel.apply(gulp, all_jsx_tasks));
gulp.task('css', gulp.parallel.apply(gulp, all_less_tasks));
gulp.task('html', gulp.parallel.apply(gulp, all_html_tasks));

gulp.task('all', gulp.parallel('js', 'css', 'html'));

gulp.task('default', gulp.series('all'));
