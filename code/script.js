//Elements
const navigation = document.getElementById("navigation");
const toggleNav = document.getElementById("toggle-nav");
const currentCity = document.getElementById("current-city");
const currentTemp = document.getElementById("current-temp");
const currentWeather = document.getElementById("current-weather");
const cityList = document.getElementById("city-list");
const myLocation = document.getElementById("my-location");
const cityOne = document.getElementById("city-one");
const cityTwo = document.getElementById("city-two");
const sunUpTime = document.getElementById("sun-up-time");
const sunDownTime = document.getElementById("sun-down-time");
const arrowButton = document.getElementById("arrow-button");
const weekList = document.getElementById("week-list");
const topRightIcon = document.getElementById("weather-icon-container");
const bodyContainer = document.querySelector(".body-container");

//Global variables
let apiResponse, nightTemp, crd, latitude, longitude;

let date = new Date();

const stylingTimer = () => {
  if (date.getHours() >= 7 && date.getHours() <= 18) {
    bodyContainer.classList.add("day");
  } else {
    bodyContainer.classList.add("night");
  }
};
stylingTimer();

//API Fetch()

// const weatherFetch = (city, countryCode) => {
//   const apiKey = "191f229fc0a6e0f86812a75292074cb9";
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       apiResponse = data;
//       console.log(apiResponse);
//       const sunriseTime = new Date(apiResponse.sys.sunrise * 1000); // API date/time value needs to be multiplied by 1000 for .toLocaleTimeString() to return the correct value
//       //console.log(sunriseTime.toLocaleTimeString())
//       sunGoesUp = sunriseTime.toLocaleTimeString();
//       const sunSetTime = new Date(apiResponse.sys.sunset * 1000);
//       sunGoesDown = sunSetTime.toLocaleTimeString();
//     });
// };

const weatherFetch = (lat, lon) => {
  const apiKey = "191f229fc0a6e0f86812a75292074cb9";
  latitude = lat;
  longitude = lon;
  fetch(
    // `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${apiKey}`
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      apiResponse = data;
      console.log(apiResponse);
      const sunriseTime = new Date(apiResponse.sys.sunrise * 1000); 
      sunGoesUp = sunriseTime.toLocaleTimeString([], {timeStyle: 'short'}); //why doesn't it work to just put this at the end of sunriseTime?
      const sunSetTime = new Date(apiResponse.sys.sunset * 1000);
      sunGoesDown = sunSetTime.toLocaleTimeString([], {timeStyle: 'short'});
      getForecastData();
    });
};

//Geolocation api
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  crd = pos.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//Async before it was cool...this is just a timer to wait for the response
//Since the fetch() will be async we need to fix this :)
const loadHtml = () => {
  setTimeout(() => {
    currentCity.innerHTML = `${apiResponse.name}`;
    currentTemp.innerHTML = `${Math.round(apiResponse.main.temp * 10) / 10} °C`;
    currentWeather.innerHTML = `${apiResponse.weather.map((weather) => {
      return weather.description;
    })}`;
    sunUpTime.innerHTML = `${sunGoesUp}`;
    sunDownTime.innerHTML = `${sunGoesDown}`;
    topRightIcon.innerHTML = `<img id="top-right-icon" src="http://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@4x.png">`;
  }, 1000);
};

//let date = new Date(time);

let clearWeekList = () => {
  weekList.innerHTML = ``;
}; 

//API Forecast fetch
const getForecastData = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=57.70&lon=11.97&units=metric&limit=5&appid=191f229fc0a6e0f86812a75292074cb9"
  )
    .then((response) => response.json())
    .then((data) => {
      //forecastResponse = data;
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("09:00")
      ); //Makes a 5 day array read at 12
      console.log(filteredForecast);

      const filteredForecastNight = data.list.filter((item) =>
        item.dt_txt.includes("21:00")
      );
      console.log(filteredForecastNight);

      filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000);
        let dayName = date.toLocaleDateString("en", { weekday: "short" }); //gives the name of each day

        filteredForecastNight.map((day) => {
          nightTemp = day.main.temp;
        });

        weekList.innerHTML += `<div class="weekDayRow"><p>${dayName}</p>
      <img id="week-list-icon" src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }@4x.png">
      <p>${Math.round(day.main.temp * 10) / 10} / ${
          Math.round(nightTemp * 10) / 10
        } °C</p></div>`;
      });
    });
};

//event listeners
toggleNav.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
});
/*
myLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
  setTimeout(() => {
    weatherFetch(latitude, longitude);
    latitude = crd.latitude;
    longitude = crd.longitude;
    cityList.classList.toggle("hidden");
    loadHtml();
  }, 3000); 
})*/
cityOne.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("57.708870", "11.974560");
  loadHtml();
  clearWeekList();
});

cityTwo.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("60.192059", "24.945831")
  loadHtml();
  clearWeekList();
});
arrowButton.addEventListener("click", () => {
  arrowButton.classList.toggle("rotate");
});

//Loads the weather
weatherFetch("59.6173", "16.5422");
loadHtml();

//TO DO
//add a logo to the top right that changes depending on time and weather.
//Put in another city and current location in the nav menu?
//either make the arrow button show more info about weather, or remove it
// styling and media queries
//fix suntime to show hh:mm and not seconds + am/pm
