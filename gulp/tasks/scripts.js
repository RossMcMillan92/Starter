module.exports = function(gulp, plugins, config, errorHandler){
	return function(){
		var src = plugins.browserify({ 
				entries: config.js.path + '/' + config.js.fileName + '.js',
			})
	        .transform('babelify')
	        .bundle()
			.on('error', errorHandler)
			.pipe(plugins.source(config.js.fileName + '.js'))
			.pipe(gulp.dest(config.js.outputPath))


		if(config.js.minification.isEnabled){
			src = src
				.pipe(plugins.rename({suffix: '.' + config.js.minification.suffix}))
				.pipe(plugins.buffer())
				.pipe(plugins.uglify())
				.pipe(gulp.dest(config.js.outputPath));
		}

		src = src  
			.pipe(plugins.livereload());
	}
}