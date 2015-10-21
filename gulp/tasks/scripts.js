module.exports = function(gulp, plugins, config, errorHandler){
	return function(){
		var src = gulp.src( config.js.fileNames.map(function(file){ return config.js.path + '/' + file + '.js'; }) );
		
		src = src

		if(config.js.browserify.isEnabled){
			src = src
				.pipe(plugins.browserify({
					insertGlobals : false
					}))
				.on('error', errorHandler)
				.pipe(gulp.dest(config.js.outputPath))
		} else {
			src = src 
				.pipe(gulp.dest(config.js.outputPath))
		}

		if(config.js.minification.isEnabled){
			src = src
				.pipe(plugins.rename({suffix: '.' + config.js.minification.suffix}))
				.pipe(plugins.uglify())
				.pipe(gulp.dest(config.js.outputPath));
		}

		src = src  
			.pipe(plugins.livereload());
	}
}