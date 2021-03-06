module.exports = function(gulp, plugins, config, errorHandler) {
	return function(){
		var src = gulp.src(config.sass.path + '/' + config.sass.masterFileName + '.scss'),
			filterMap = plugins.filter('*map'),
			filterSass = plugins.filter('*css');

		src = src
		.pipe(plugins.sass({
			style: 'nested'
		}))
	    .on('error', errorHandler)
		.pipe(filterMap)
		.pipe(gulp.dest(config.sass.outputPath))
		.pipe(filterMap.restore())
		.pipe(filterSass)
		.pipe(plugins.autoprefixer({
	    	browsers: config.sass.autoPrefixerBrowsers
	    }))
		.pipe(plugins.cmq())
		.pipe(plugins.pixrem(config.sass.baseFontSize, {
			atrules: true
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

		if(config.browserSync.isEnabled && config.browserSync.cssAutoreload){
			src = src
			.pipe(plugins.reload({stream:true}));
		}
	    
	}

}