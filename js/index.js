(function(){
	var weatherManager = {
		cities: [],
		key: 'cf2e9e121bc6d939ba6e05327bc40d57',
		url: 'http://api.openweathermap.org/data/2.5/weather',
		units: 'metric',
		
		init: function(){	
			this.cacheDom();
			this.bindEvents();
		},
		
		cacheDom: function(){
			this.$cityName = $('.input-case');
			this.$btnSearch =  $('.btn-search');
			this.$btnClear = $('.btn-clear');
			this.$forecast = $('.forecast');
		},	
		
		bindEvents: function(){
			this.$btnSearch.click(this.checkInput.bind(this));
			this.$btnClear.click(this.deleteValues.bind(this));
		},
		
		checkInput: function(){
			var cityName = this.$cityName.val();
			if(this.$cityName && cityName != ''){
				cityName = cityName.trim();
				this.getWeather(cityName, this.key, this.units);
				this.$cityName.val('');
			}
			else{
				alert('WRONG INPUT');
			}
		},

		deleteValues: function(){
			this.html = '';
			this.cities = [];
			this.$forecast.text('');
		},

		getWeather: function(cityName, key, units) {
			$.ajax({ 
				context: this, 
				dataType: "jsonp", 
				requestType: 'GET',
				url: 'http://api.openweathermap.org/data/2.5/weather', 
				jsonCallback: 'jsonp', 
				data: { q: cityName, appid: key, units: units }, 
				cache: false, 
				success: this.getDataCallback
			})
		},	
		
		getDataCallback: function(data){

			this.cities.push({
				name: data.name, 
				country: data.sys.country,
				temp: data.main.temp,
				description: data.weather[0].description
			});
			this.render();	
		},
		
		render: function(){

			var city = this.cities[this.cities.length - 1];
			var html =  '<p>' +  
						city.name + ', '  +
						city.country + ': '  +
						city.temp + '°C  ' + 
						city.description + '</p>';
			
			this.$forecast.append( html);     		
		}
	};

	$( document ).ready(function() {
		weatherManager.init();
	});
})()