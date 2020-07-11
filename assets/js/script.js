AOS.init();

// Input Variables
const cityInputEl = document.querySelector("#city-input");
const cityInputContainer = document.querySelector(".city-selected");

// 5 Day Forecast Variables
const forecastContainer = document.querySelector(".forecast")
const forecastItemsContainer = document.querySelector(".forecast-row");


// Current Forecast
const currentWeatherContainer = document.querySelector(".current-weather");
const citySearchedEl = document.querySelector(".city-searched");
const cityTemperatureEl = document.querySelector(".city-temperature");
const cityHumidityEl = document.querySelector(".city-humidity");
const cityWindSpeedEl = document.querySelector(".city-wind");
const cityUVIndexEl = document.querySelector(".city-index");

async function getWeatherInfo(city){
    const initialFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=a0453456fb9621adaf5cc02de2936b37&q=${city}`)
    const initialFetchFormatted = await initialFetch.json();
    console.log(initialFetchFormatted);

    // Store Latitude and Longitude
    const cityLat = initialFetchFormatted.coord.lat;
    const cityLon = initialFetchFormatted.coord.lon;

    // Use Lat and Long To One Time Call All Necessary Data
    const unformattedResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,minutely&units=imperial&appid=a0453456fb9621adaf5cc02de2936b37&q`);
    const formattedResponse = await unformattedResponse.json();
    console.log(formattedResponse)

    currentDayGenerator(formattedResponse.current, initialFetchFormatted.name)
    forecastGenerator(formattedResponse)
}

function inputSubmitHandler(event){
    // prevent submit from refreshing page
    event.preventDefault();
    if(citySearchedEl.innerHTML) {
        currentWeatherContainer.setAttribute("data-aos", "fade-out");
        currentWeatherContainer.classList.add("before-click");
    }

    // values only allowable in form submission
    let regex = /[^a-zA-Z ]/g;

    // get value from input
    let city = cityInputEl.value.trim();
    // if city name is entered
    if (!regex.test(city)){
        getWeatherInfo(city);
        return cityInputEl.value = "";
    } else {
        alert("Invalid City")
    }
}

function populateData(city) {
    citySearchedEl.textContent(city.name);

    // convert temp to Fahrenheit
    let convertedTemp = city[0].main.temp * (9/5) - 459.67;
    cityTemperatureEl.textContent(convertedTemp);

    cityHumidityEl.textContent(city[0].main.humidity);
    cityWindEl.textContent(city[0].wind.speed);
}

function currentDayGenerator(current, name){
    let todaysDate = moment();
    
    console.log(current)
    currentWeatherContainer.classList.remove("before-click");
    currentWeatherContainer.setAttribute("data-aos", "fade-up");
    const weatherIcon = `<img src='http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png'>`

    
    citySearchedEl.innerHTML = `${name} (${todaysDate.format('M/DD/YYYY')}) ${weatherIcon}`;
    cityTemperatureEl.innerHTML = `${current.temp}`;
    cityHumidityEl.innerHTML = `${current.humidity} %`;
    cityWindSpeedEl.innerHTML = `${current.wind_speed} MPH`;
    cityUVIndexEl.innerHTML = current.uvi;
}

function forecastGenerator(forecast) {
    // Clearing DIV
    let forecastRowId = document.getElementById("forecast-row");
    forecastRowId.innerHTML = "";

    let today = moment();

    // Creates Cards
    for (let i = 1; i <= 5; i ++) {
        // create the div
        const forecastCard = document.createElement("div");
        forecastCard.setAttribute("data-aos", "fade-in");
        forecastCard.classList = "card border border-danger m-1 p-3 cold-day";

        // create the header
        const forecastHeader = document.createElement("h5");
        forecastHeader.innerHTML = today.add([i], 'days').format('M/DD/YYYY');
        forecastCard.append(forecastHeader);

        // create the img container
        const weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + forecast.daily[i].weather[0].icon + ".png");
        weatherIcon.setAttribute("width", "50px");
        weatherIcon.setAttribute("height", "50px");
        forecastCard.appendChild(weatherIcon);

        // create Temperature container
        const forecastTemp = document.createElement("p");
        forecastTemp.innerHTML = `Temp: ${forecast.daily[i].temp.day} <span>&#8457</span>`;
        forecastCard.appendChild(forecastTemp);

        // create Humidity container
        const forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = `Humidity: ${forecast.daily[1].humidity}%`;
        forecastCard.appendChild(forecastHumidity);

        // Append And Show Forecast
        forecastItemsContainer.appendChild(forecastCard);
        forecastContainer.classList.remove("before-click");
        forecastContainer.setAttribute("data-aos", "fade-up");
    }
}

cityInputContainer.addEventListener("submit", inputSubmitHandler);