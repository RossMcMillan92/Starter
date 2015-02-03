# AD Starter Template

## Gulp
### Setup
Navigate to template folder and run 'sudo npm install'. If this fails, delete node_modules folder and run 'sudo npm cache clean', then try again.

Open /gulp/config.js and fill in variables with accurate information about files/folder structure (This should already work off the bat with this template.) Different features and tasks can be enabled or disabled here. 

Unless adding a new task, the config file is the only file that should be changed with each project. If adding a new task/plugin which proves useful and reusable, consider setting up properly in the config file and saving to this repository.

### Running
Navigate to templates folder and run 'gulp'

### Current functions
#### BrowserSync
Used to sync user input across multiple browsers as well as auto-inject css changes

#### JS
Minification and browserify

#### SASS
Minification, autoprefixer, CMQ (Collect media queries), pixrem (Rem fallback)

## SASS
Based on ITCSS by Harry Roberts
https://speakerdeck.com/dafed/managing-css-projects-with-itcss

1. Settings 		- Variables, config.
2. Tools 			- Mixins, functions
3. Generic 		- Normalize, reset, * {}
4. Base 			- Unclassed HTML rules
5. Objects 		- Cosemetic-free design patterns
6. Components 	- Chunks of UI
7. Trumps 		- Helpers and overrides

The goal of this architecture is to minimise waste and avoiding 'undoing' any css rules. 

## JS
Organised around the CommonJS format, using browserify to build the final js. All app and setup scripts should go in the main 'script.js'. Custom built modules should be written in the CommonJS format and stored in the /js/modules folder, where they can be 'required' within the main script.js. Any 3rd party plugins or libraries should go in /js/plugins.