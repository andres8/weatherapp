var latitud, longitud;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      latitud = position.coords.latitude;
      longitud = position.coords.longitude
      $.ajax({
		type : "GET",
		dataType : "json",
		url : "https://api.openweathermap.org/data/2.5/weather?lat="+latitud+"&lon="+longitud+"&units=metric&appid=ef9571c606567d91f5bf749088a2e2fd",
		success: function(meteo){
			//$("#main-background").html("");
			var id = meteo.weather[0].id;
			console.log(meteo.weather[0].id);
			var u = new Date();
			var hours = u.getHours();
			switch (true){
				case id<300:
				$('#main-background').addClass('thunderstorm');
				break;
				case id<400 && id>=300:
				$('#main-background').addClass('drizzle');
				break;
				case id<600 && id>=400:
				$('#main-background').addClass('rain');
				break;
				case id<700 && id>=500:
				$('#main-background').addClass('snow');
				break;
				case id===781:
				$('#main-background').addClass('tornado');
				break;
				case id===800 && hours>=19:
				$('#main-background').addClass('calm-night');
				break;
				case id===800 && hours<19 && hours>6:
				$('#main-background').addClass('sunny');
				break;
				case id>700 && id<=804 && hours<19 && hours>6:
				$('#main-background').addClass('cloudy');
				break;
				case id>700 && id<=804 && hours>=19:
				$('#main-background').addClass('cloudy-night');
				break;
				case id===900:
				$('#main-background').addClass('tornado');
				break;
				
			}
			$("#carlos").html("<img src='https://openweathermap.org/img/w/"+meteo.weather[0].icon+".png'>"+Math.round(meteo.main.temp)+" <i class='wi wi-celsius'></i>");
			$('#toggle-event').change(function() {
				if($(this).prop('checked')){
					$("#carlos").html("<img src='https://openweathermap.org/img/w/"+meteo.weather[0].icon+".png'>"+Math.round(meteo.main.temp)+" <i class='wi wi-celsius'></i>");
				}
				else{
					$("#carlos").html("<img src='https://openweathermap.org/img/w/"+meteo.weather[0].icon+".png'>"+Math.round(ToFaren(meteo.main.temp))+" <i class='wi wi-fahrenheit'></i>");
				}
			});
			$("#emplacement").html(meteo.name +", " +meteo.sys.country);
			$("#main").html(meteo.weather[0].main);
			console.log(meteo.weather[0].description);
			
				$(".velocidad").html(meteo.weather[0].description);
				console.log(meteo.weather[0].description);
			

			//$("#carlos").html("<img src='http://openweathermap.org/img/w/"+meteo.weather[0].icon+".png'>"+Math.floor(meteo.main.temp)+" <i class='wi wi-celsius'></i>");	
		}
	});
    });
  }
else{
    // no geolocation :(
    msg = "Sorry, looks like your browser doesn't support geolocation";
    outputResult(msg); // output error message
    //$('.pure-button').removeClass('pure-button-primary').addClass('pure-button-success'); // change button style
  }
function ToFaren(val){
	return val * 9/5+32;
}
var t = ToFaren(17);

