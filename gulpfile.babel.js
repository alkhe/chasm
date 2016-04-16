import gulp from 'gulp';
import stylus from 'gulp-stylus';
import clean from 'gulp-clean-css';
import pug from 'gulp-pug';
import live from 'gulp-livereload';
// import rename from 'gulp-rename';

import nib from 'nib';

let [task, src, dest] = [::gulp.task, ::gulp.src, ::gulp.dest];

let handleError = function(error) {
	console.log(error.toString());
	this.emit('end');
}

task('default', ['pro']);

task('dev', () =>
	src('src/index.styl')
		.pipe(stylus({ use: nib() }))
		.on('error', handleError)
		.pipe(dest('lib'))
		.pipe(live())
);

task('pro', () =>
	src('src/index.styl')
		.pipe(stylus({ use: nib() }))
		.pipe(clean({ advanced: true }))
		.on('error', handleError)
		.pipe(dest('lib'))
);

task('pug', () =>
	src('pug/**/*.pug')
		.pipe(pug())
		.on('error', handleError)
		.pipe(dest('html'))
		.pipe(live())
)

task('live', () => {
	live.listen();
	gulp.watch('src/**/*.styl', ['dev']);
	gulp.watch('pug/**/*.pug', ['pug']);
})
