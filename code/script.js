//Elements
const navigation = document.getElementById("navigation");
const toggleNav = document.getElementById("toggle-nav");
const currentCity = document.getElementById("current-city");
const currentTemp = document.getElementById("current-temp");
const currentWeather = document.getElementById("current-weather");
const cityList = document.getElementById("city-list");
const cityOne = document.getElementById("city-one");
const cityTwo = document.getElementById("city-two");
const sunUpTime = document.getElementById("sun-up-time");
const sunDownTime = document.getElementById("sun-down-time");
const arrowButton = document.getElementById("arrow-button");
const weekList = document.getElementById("week-list");

//Global variables
let apiResponse;

//API Fetch()

const weatherFetch = (city, countryCode) => {
  const apiKey = "191f229fc0a6e0f86812a75292074cb9";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      apiResponse = data;
      console.log(apiResponse);
      const sunriseTime = new Date(apiResponse.sys.sunrise * 1000); // API date/time value needs to be multiplied by 1000 for .toLocaleTimeString() to return the correct value
      //console.log(sunriseTime.toLocaleTimeString())
      sunGoesUp = sunriseTime.toLocaleTimeString();
      const sunSetTime = new Date(apiResponse.sys.sunset * 1000);
      sunGoesDown = sunSetTime.toLocaleTimeString();
    });
};

//Async before it was cool...this is just a timer to wait for the response
//Since the fetch() will be async we need to fix this :)
const loadHtml = () => {
  setTimeout(() => {
    currentCity.innerHTML = `${apiResponse.name}`;
    currentTemp.innerHTML = `${Math.round(apiResponse.main.temp * 10) / 10}`;
    currentWeather.innerHTML = `${apiResponse.weather.map((weather) => {
      return weather.description;
    })}`;
    sunUpTime.innerHTML = `${sunGoesUp}`;
    sunDownTime.innerHTML = `${sunGoesDown}`;
  }, 1000);
};

//event listeners
toggleNav.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
});

cityOne.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("Gothenburg", "Swe");
  loadHtml();
});
cityTwo.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("Helsinki", "Fi");
  loadHtml();
});

//Loads the weather
weatherFetch("Uppsala", "swe");
loadHtml();
