module.exports = function(gulp, plugins, config, errorHandler) {
	return function(){
		var src = gulp.src(config.sass.path + '/' + config.sass.masterFileName + '.scss'),
			filterMap = plugins.filter('*map'),
			filterSass = plugins.filter('*css');

		src = src
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass({
				style: 'nested'
			}))
		    .on('error', errorHandler)
			.pipe(plugins.sourcemaps.write())
			.pipe(plugins.autoprefixer({
		    	browsers: config.sass.autoPrefixerBrowsers
		    }))
			.pipe(gulp.dest(config.sass.outputPath))

		if(config.sass.minification.isEnabled){
	    	src = src  
				.pipe(plugins.rename({
					suffix: '.' + config.sass.minification.suffix,
					keepSpecialComments: 0
				}))
				.pipe(plugins.minifycss({noAdvanced: true}))
				.pipe(gulp.dest(config.sass.outputPath));
		}

		src = src  
			.pipe(plugins.livereload());

	}

}