var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");


var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var cityname = nameInputEl.value.trim();
  if (cityname) {
    getCityWeather(cityname);
    // clear old content
    weatherContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter city");
  }
};

var getCityWeather = function(user) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + user + "&units=imperial&appid=29ca62d72a78d3a80457925d6f338f1c";
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function(data) {
        //   console.log(data);
           displayWeather(data, user);
         //   console.log(data.list[0].main.temp);
        });
      } else {
        alert("Error: " + response.statusText);
      }})
    .catch(function(error) {
      alert("Unable to connect to Weather");
    });
};

var displayWeather = function(city, searchTerm) {
    // check to see if they type in a city that comes is allowed
    if (city.length === 0) {
      weatherContainerEl.textContent = "No city found";
      return;
    }
      //  for loop the weather data and then create the elements
    for (var i = 0; i < 5; i++) {
      // var used to travers the api
      var tempWeather= city.list[i].main.temp;
      var condWeather= city.list[i].weather.main;
      var condIcon= city.list[i].weather.icon;
      var dateOf= city.list[i].dt_text;
      // tests logs
      console.log(condWeather);
      console.log(condIcon);
      console.log(tempWeather);
      console.log(dateOf);
      // create the div that holds the results
      var cityEl = document.createElement("div");
      cityEl.classList = "list-item row flex-row justify-space-between align-center";
      cityEl.textContent = searchTerm;
// displays the date of the weather day
      var dateEl = document.createElement("li")
      dateEl.classList= " col-3 flex-row align-center";
      dateEl.textContent= dateOf;
      cityEl.appendChild(dateEl);
// displays the weather conditions
      var conditionEl = document.createElement("li");
      conditionEl.classList = " col-3 flex-row align-center";
      conditionEl.textContent = condWeather;
      cityEl.appendChild(conditionEl);
// displays the weather temp
      var tempEl = document.createElement("li");
      tempEl.classList = "col-3 flex-row align-center";
      tempEl.textContent = tempWeather;
      cityEl.appendChild(tempEl);
// displays the icon for the weather
      var iconEl = document.createElement("li");
      iconEl.classList = "col-3 flex-row align-center";
      iconEl.textContent = condIcon;
      cityEl.appendChild(iconEl);

// appends it all
      
      weatherContainerEl.appendChild(cityEl);
//  trying to set to local storage
      // localStorage.setItem(("cityId"+[i]),list[i],)
    }
  };


  // this is to display the stored cities

  // for (var i = 0; i < length; i++) {
  //  localStorage.getItem(("cityId"+[i]),list[i],)



// var displayWeek= function(data){
//     console.log(data);  
    
//     var heat = data.list+".[0]"
//     for(var i = 0; i < 5; i++ ){
//         console.log(heat.main.temp);
//     }};
// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);




