//初始化
var gulp = require('gulp');

gulp.task('default', function () {
    console.log('Hello Gulp!,default task');
}); //定义默认任务

// 1.step1 添加文件用例
gulp.src('./assign.js') //读取文件
    .pipe(gulp.dest('dist')); //写入文件

// 2.step2 - 通配符的使用
gulp.src('./page/**/*.js') //读取文件
    .pipe(gulp.dest('dist')); //写入文件

// 3.step3 - 生成用例任务
gulp.task('minZW', function () {
    console.log("正在执行minZW任务");
});
gulp.task('uglify', function () {
    console.log("正在执行uglify任务");
});

//3.5.step3.5 - 复合型任务
gulp.task('js', function () {
    console.log("正在执行js任务");
});
gulp.task('css', function () {
    console.log("正在执行css任务");
});
gulp.task('es',function(){
    console.log("正在执行es任务");
});
gulp.task('zhaowa', gulp.parallel(['js', 'css','es'])); //并行执行任务

// 4.step4 - 监听文件变化,并执行任务
// gulp.watch('./page/**/*.js',
//     gulp.parallel(
//         ['minZW', 'uglify','zhaowa'] //正序
//     )
// ); 

// 5.异步
gulp.task('async',gulp.parallel(
    function (done) {
        setTimeout(()=>{
            console.log("zhaowa async")
            done()
        },1000)
    }
));

gulp.task('zhaowa2', gulp.parallel(['async'],
    function () {
        console.log("after async code")
    }
)); 
//跑异步，
gulp.watch('./page/**/*.js',
        gulp.parallel(
            ['zhaowa2','minZW', 'uglify','zhaowa'] //正序
        )
    ); 