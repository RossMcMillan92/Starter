
/*----------------------------------
    Responsive Helper
    Creates a buffer so the given 
    functions don't get spammed
    on resize

    Usage:
    ResponsiveHelper.add(function(){
        console.log('The page is resizing!')
    })
----------------------------------*/

var Tools = require('./tools.js'),

    ResponsiveHelper = module.exports = (function() {

        var instance = false;

        function ResponsiveHelper()
        {
        	var self = this;

            self.resizeCallBackList = [];
            self.nameMap = []
            self.curInt = 0

            Tools.bind(window, 'resize', function(){
            	self._resize.apply(self);
            })
        };
        
        // if runNow is true, the callback will run now AND on resize
        ResponsiveHelper.prototype.add = function( callBack, runNow, name )
        {
            var windowWidth = Tools.windowSize().width;
            if(name){
                if(this.nameMap[name] != undefined) return;

                this.nameMap[name] = this.curInt;
            } 

            this.resizeCallBackList[this.curInt] = callBack;
            this.curInt++;
            if(runNow){
                callBack.apply(this, [windowWidth]);
            }
        };
     
        ResponsiveHelper.prototype._resize = function()
        {
        	var self = this;

            if(self.timeout)
              clearTimeout( self.timeout );

            self.timeout = setTimeout( function(){
            	self._executeResizeCallbacks.apply(self)
            }, 300 );

        };
     
        ResponsiveHelper.prototype._executeResizeCallbacks = function()
        {
            var windowWidth = Tools.windowSize().width;
            for ( var i=0, j=this.resizeCallBackList.length; i<j; i++ )
            {
                this.resizeCallBackList[i].apply(this, [windowWidth]);
            };
        };
     
        if(!instance){
            instance = new ResponsiveHelper();
        }
        return instance;
     
    })();
