$(document).ready(function() {
  function formatTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  function formatDay(date) {
    const dayArray = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const day = days[dayArray];
    return day;
  }

  const currentTime = $(".time");
  let newCurrentTime = new Date();
  currentTime.html(formatTime(newCurrentTime));

  const currentDay = $(".date");
  let newCurrentDay = new Date();
  currentDay.html(formatDay(newCurrentDay));

  function displayWeatherInfo(response) {
    $(".name").html(`${response.name}, ${response.sys.country}`);
  
    const temperature = Math.round(response.main.temp - 273.15);
    $(".temp").html(`${temperature}°C`);
    $(".temp123").html(`${temperature}°C`);
    const maxtemperature = Math.round(response.main.temp_max - 273.15);
    $(".Max").html(`${maxtemperature}°C`);
    const mintemperature = Math.round(response.main.temp_min - 273.15);
    $(".Min").html(`${mintemperature}°C`);
    const feeltemperature = Math.round(response.main.feels_like - 273.15);
    $(".feelLike").html(`${feeltemperature}°C`);
    const humidity = response.main.humidity;
    $(".humidity").html(`${humidity}%`);
    $(".condition").html(response.weather[0].main);
    const pressure = response.main.pressure;
    $(".pressure").html(`${pressure}hPa`);
    const visibility = response.visibility;
    $(".Visibility").html(`${visibility}m`);

    const timezoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;
    const localTimeInSeconds = Math.floor(Date.now() / 1000) + response.timezone + timezoneOffsetInSeconds;
    const localDate = new Date(localTimeInSeconds * 1000);

    // Display the local time and date of the city
    $(".time").html(formatTime(localDate));
    $(".date").html(formatDay(localDate));
  }

  function searchCity(city) {
    const apikey = "d09a9a23922bc6f8ca3b00e882ce67c3";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        displayWeatherInfo(data);
      })
      .catch(error => {
        console.error("Error: ", error);
        document.getElementById("weather-data").innerHTML = "Error fetching weather data. Please try again later.";
      });
  }

  $("#locationinput").on("submit", function(event) {
    event.preventDefault();
    let city = document.getElementById("search").value;
    console.log(city);
    searchCity(city);
  });
  searchCity("Faisalabad");
});