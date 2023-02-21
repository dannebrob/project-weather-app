//Elements
const navigation = document.getElementById("navigation");
const currentCity = document.getElementById("current-city");
const currentTemp = document.getElementById("current-temp");
const currentWeather = document.getElementById("current-weather");
const cityOne = document.getElementById("city-one");
const cityTwo = document.getElementById("city-two");
const sunUpTime = document.getElementById("sun-up-time");
const sunDownTime = document.getElementById("sun-down-time");
const arrowButton = document.getElementById("arrow-button");
const weekList = document.getElementById("week-list");

//Global variables
let apiResponse;

//API Fetch()
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7589b7284cc9830145db4f0a3c86e92a"
)
  .then((response) => response.json())
  .then((data) => {
    apiResponse = data;
    console.log(apiResponse);
  });
//Async before it was cool...this is just a timer to wait for the response
//Since the fetch() will be async we need to fix this :)
setTimeout(() => {
  currentCity.innerHTML = `${apiResponse.name}`;
  currentTemp.innerHTML = `${apiResponse.main.temp}`;
}, 1000);

//var date = new Date(time);
