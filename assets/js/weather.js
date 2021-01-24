var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getUserRepos(cityname);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter city");
  }
};

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + user + "&units=imperial&appid=29ca62d72a78d3a80457925d6f338f1c";
//   var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=29ca62d72a78d3a80457925d6f338f1c";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function(data) {
        //   console.log(data);
           displayRepos(data.list, user);
        //   displayWeek(data);
        //   console.log(data.list[0].main.temp);
          
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Weather");
    });
};




var displayRepos = function(city, searchTerm) {
    // check if api returned any repos
    if (city.length === 0) {
      repoContainerEl.textContent = "No repositories found.";
      return;
    }
    
       
    // loop over repos
    for (var i = 0; i < 5; i++) {
      // format repo name
      var condWeather= city[i].weather.main;
      var condIcon= city[i].weather.icon;
      var tempWeather= city[i].main.temp;
      var dateOf= city[i].dt_text;
      console.log(condWeather);
      console.log(condIcon);
      console.log(tempWeather);
      console.log(dateOf);
    //   console.log(tempWeather);
  
      // create a container for each repo
      var cityEl = document.createElement("div");
      cityEl.classList = "list-item flex-row justify-space-between align-center";
      cityEl.textContent = searchTerm;

      var dateEl = document.createElement("li")
      dateEl.classList= "flex-row align-center";
      dateEl.textContent= dateOf;
      cityEl.appendChild(dateEl);

      var conditionEl = document.createElement("li");
      conditionEl.classList = "flex-row align-center";
      conditionEl.textContent = condWeather;
      cityEl.appendChild(conditionEl);

      var tempEl = document.createElement("li");
      tempEl.classList = "flex-row align-center";
      tempEl.textContent = tempWeather;
      cityEl.appendChild(tempEl);

      var iconEl = document.createElement("li");
      iconEl.classList = "flex-row align-center";
      iconEl.textContent = condIcon;
      cityEl.appendChild(iconEl);
    //   cityEl.setAttribute("span", searchTerm);
    //   cityEl.appendChild(conditionEl);
  
      // create a span element to hold repository name
      
  
      // append to container
      
  
      // create a status element
    //   var statusEl = document.createElement("span");
    //   statusEl.classList = "flex-row align-center";
  
    //   // check if current repo has issues or not
    //   if (city[i].open_issues_count > 0) {
    //     statusEl.innerHTML =
    //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    //   } else {
    //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //   }
  
      // append to container
    //   cityEl.appendChild(statusEl);
  
      // append container to the dom
      repoContainerEl.appendChild(cityEl);
    }
  };
  

  
var displayWeek= function(data){
    console.log(data);  
    
    var heat = data.list+".[0]"
    for(var i = 0; i < 5; i++ ){
        console.log(heat.main.temp);
    }};
// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
