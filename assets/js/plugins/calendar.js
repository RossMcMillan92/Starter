;(function( $ ) {

	$(document).ready(function(){

		
		
		Handlebars.registerHelper('eachProperty', function(context, options) {
		    var ret = "";
		    for(var prop in context)
		    {
		    	if(context.hasOwnProperty(prop))
		    	{
			        ret = ret + options.fn({property:prop,value:context[prop]});
			    }
		    }
		    return ret;
		});

		var d = new Date();

		var xhr;

		//var $loc_only = $('#location-only');
		var filter_id = $('#cal').data('filter_id');
		

		var current_month = d.getMonth(); //zero based
		var current_year = d.getFullYear();

		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

		var cacheArray = {};

		var source   = $("#calendar-template").html();
		source = source.replace(/\"\/{{/g,"\"{{"); //forward slash getting added on all hrefs :(
		var template = Handlebars.compile(source);

		var $target = $('.calendar-table > tbody');
		var $month = $('.calendar-month');
		var $loader = $('.calendar-loader');

		$('.calendar-next-month').on('click',function(){
			current_month++;
			if( current_month > 11 )
			{
				current_month = 0;
				current_year++;
			}
			$('.calendar-loading').addClass('show');
			getCalendar(current_month,current_year);
		    PROJ.calendarSetup();
			
		});

		$('.calendar-previous-month').on('click',function(){
			current_month--;
			if( current_month < 0 )
			{
				current_month = 11;
				current_year--;
			}
			getCalendar(current_month,current_year);
		    PROJ.calendarSetup();
			
		});

		$('.filter_time, .filter_access').on('click',function(){

			
			$('.calendar-loading').addClass('show');
			getCalendar(current_month,current_year);
		});

		

		/*$loc_only.on('click',function(){
			if( $(this).hasClass('active') )
			{
				$(this).removeClass('active');
			}
			else
			{
				$(this).addClass('active');
			}
			getCalendar(current_month,current_year);
		});*/

		var getCalendar = function(month,year)
		{
			if( typeof xhr != 'undefined' )
			{
				xhr.abort();
			}

//alert("month" + month);

			$month.html(monthNames[month] + ' ' + year);
			$loader.addClass('show');
			$target.addClass('loading');
			month = month+1;
			

			if(  $('input[name="filter_time"]:checked').val() )
			{
				 var ft = $('input[name="filter_time"]:checked').map(function(){
				      return $(this).val();
				    }).get(); 
			}
			else
			{
				var ft = 'no';
			}


			if(  $('input[name="filter_access"]:checked').val() )
			{
				 var fa = $('input[name="filter_access"]:checked').map(function(){
				      return $(this).val();
				    }).get(); 
			}
			else
			{
				var fa = 'no';
			}

			cacheArray[year] = cacheArray[year] || {};
			cacheArray[year][month] = cacheArray[year][month] || {};
			cacheArray[year][month][ft] = cacheArray[year][month][ft] || {};

			if( cacheArray[year][month][ft][fa] )
			{
				var html = template(cacheArray[year][month][ft][fa]);
				$target.html(html);
				$target.removeClass('loading');
				$loader.removeClass('show');

				$('.calendar a[rel*=external]').on('click', function() {
			        window.open(this.href);
			        return false;
			    });
			}
			else
			{
				if(ft=="no")
				{
					ft='';
				}
				if(fa=="no")
				{
					fa='';
				}



				//xhr = $.getJSON("/index.php", { option: 'com_tessitura_bridge', task: 'calendar', Itemid: '472', format: 'raw', m: month, y:year, f:ft })
				xhr = $.getJSON("/index.php", { option: 'com_productions', view: 'fe_calendar', format: 'raw', m: month, y:year, ft:ft, fa:fa, filter_id:filter_id })
				.done(function(data) {
					if( ft=='' ){
						ft = "no";
					}
					if( fa=='' ){
						fa = "no";
					}
					cacheArray[year][month][ft][fa] = data;
					var html = template(data);
					
					$target.html(html);
					$target.removeClass('loading');
					$loader.removeClass('show');


					$('.calendar a[rel*=external]').on('click', function() {
				        window.open(this.href);
				        return false;
				    });

				    PROJ.calendarSetup();
				});
			}
		}

		getCalendar(current_month,current_year);
	});
})(jQuery);


