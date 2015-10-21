/* ----------------------
// CONFIG
// Paths are relative to the main 'gulpfile.js'
---------------------- */

config = {
	/* -----------------------
	// JS build
	// Takes multiple input files (polyfills and main script)
	// Outputs build in same folder
	----------------------- */
	js: {
		isEnabled: true,

		fileName: 'script', // Array of file names
		path: './_themes/scotpulse2015/assets/src/scripts',
		outputPath: './_themes/scotpulse2015/assets/build/scripts', 

		minification: {
			isEnabled: true,
			suffix: 'min'
		}
	},

	/* -----------------------
	// SASS build
	// Takes master SASS file
	// Outputs build in given 'output' folder
	----------------------- */
	sass: {
		isEnabled: true,

		masterFileName: 'master',
		path: './_themes/scotpulse2015/assets/src/styles',
		outputPath: './_themes/scotpulse2015/assets/build/styles', 

		minification: {
			isEnabled: true,
			suffix: 'min'
		},
	
		// misc css settings
		autoPrefixerBrowsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4'], // for auto prefixer
	},

	/* -----------------------
	// Watch
	// Watches files for changes
	----------------------- */
	watch: {
		isEnabled: true,

		watchJs: true,
		watchCss: true
	}
}

module.exports = config;
