AOS.init();

let recentCitiesArray = [];

// Input Variables
const cityInputEl = document.querySelector("#city-input");
const cityInputContainer = document.querySelector(".city-selected");

// Recent City Search Variable
let recentCityList = document.querySelector(".list-group");

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
    try {
        let initialFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=a0453456fb9621adaf5cc02de2936b37&q=${city}`);
        let initialFetchFormatted = await initialFetch.json();
        // console.log(initialFetchFormatted);

        // Store Latitude and Longitude
        const cityLat = initialFetchFormatted.coord.lat;
        const cityLon = initialFetchFormatted.coord.lon;

        // Use Lat and Long To One Time Call All Necessary Data
        const unformattedResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,minutely&units=imperial&appid=a0453456fb9621adaf5cc02de2936b37&q`);
        const formattedResponse = await unformattedResponse.json();
        
        if (recentCitiesArray.includes(city)){
            currentDayGenerator(formattedResponse.current, initialFetchFormatted.name);
            forecastGenerator(formattedResponse);
        } else {
            recentCity(city);
            currentDayGenerator(formattedResponse.current, initialFetchFormatted.name);
            forecastGenerator(formattedResponse);
        }
    } catch (err) {
       return errorInput();
    } 
}

// Submit from input received
function inputSubmitHandler(event){
    // prevent submit from refreshing page
    event.preventDefault();

    // If there are cities that have been searched
    if(citySearchedEl.innerHTML) {
        // fade out the current weather container
        currentWeatherContainer.setAttribute("data-aos", "fade-out");
        // hide it with opacity 0
        currentWeatherContainer.classList.add("before-click");
    }

    // define values allowed in form submission
    let regex = /[^a-zA-Z ]/g;

    // get value from input
    let city = cityInputEl.value.trim();

    // if city name is entered
    if (!regex.test(city)){
        getWeatherInfo(city);
        return cityInputEl.value = "";
    } else {
        return errorInput();
    }
}

function currentDayGenerator(current, name){
    let todaysDate = moment();
    
    currentWeatherContainer.classList.remove("before-click");
    currentWeatherContainer.setAttribute("data-aos", "fade-up");
    const weatherIcon = `<img src='http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png'>`

    
    citySearchedEl.innerHTML = `${name} (${todaysDate.format('M/DD/YYYY')}) ${weatherIcon}`;
    cityTemperatureEl.innerHTML = `${current.temp}`;
    cityHumidityEl.innerHTML = `${current.humidity} %`;
    cityWindSpeedEl.innerHTML = `${current.wind_speed} MPH`;

    if (current.uvi >= 0 && current.uvi <= 2.99) {
        cityUVIndexEl.innerHTML = `<span class='low p-1'>${current.uvi}</span>`;
    } else if (current.uvi >= 3 && current.uvi <= 5.99) {
        cityUVIndexEl.innerHTML = `<span class='moderate p-1'>${current.uvi}</span>`;
    } else if (current.uvi >= 6 && current.uvi <= 7.99){
        cityUVIndexEl.innerHTML = `<span class='high p-1'>${current.uvi}</span>`;
    } else if (current.uvi >= 8 && current.uvi <= 10.99){
        cityUVIndexEl.innerHTML = `<span class='very-high p-1'>${current.uvi}</span>`;
    } else if (current.uvi >= 11){
        cityUVIndexEl.innerHTML = `<span class='extreme p-1 text-light'>${current.uvi}</span>`;
    }
}

function forecastGenerator(forecast) {
    // Clearing DIV
    let forecastRowId = document.getElementById("forecast-row");
    forecastRowId.innerHTML = "";

    let today = moment();

    // Creates Forecast Cards
    for (let i = 1; i <= 5; i ++) {
        // create the div
        const forecastCard = document.createElement("div");
        forecastCard.setAttribute("data-aos", "fade-in");
        forecastCard.classList = "card border border-dark ml-2 p-3 cold-day col-5 col-md-4 col-lg-3 col-xl-2 forecast-item";

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

function recentCity(city){
    // If the recent cities has not items
    if (!recentCityList.innerHTML){
        // Create li and append to the list
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = city;
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.appendChild(recentCityListItem);
        return saveCitiesSearched(city);
    } else if (!recentCitiesArray.includes(city)){
        // If there are items on the list then prepend
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = city;
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.prepend(recentCityListItem);
        return saveCitiesSearched(city);
    }
}

function saveCitiesSearched(city){
    if (recentCitiesArray.length == 0){
        recentCitiesArray.push(city);
    } else if (recentCitiesArray.length < 8){
        recentCitiesArray.unshift(city);
    } else if (recentCitiesArray.length >= 8){
        recentCitiesArray.unshift(city);
        recentCitiesArray = recentCitiesArray.slice(0,8);
        recentCityList.removeChild(recentCityList.childNodes[8]);
    }
    localStorage.setItem("recent", JSON.stringify(recentCitiesArray));
    renderCities(recentCitiesArray);
}

function loadRecent(){
    // If there are no cities in localStorage
    if ("recent" in localStorage){
        let loadedCities = [];
        loadedCities = JSON.parse(localStorage.getItem("recent"));
        recentCitiesArray = loadedCities;
        renderCities(loadedCities)
    } 
    else {
        // Set localStorage with empty array
        localStorage.setItem("recent", []);
    }
}

function generateWeather(event){
    let cityClicked = event.target.textContent;
    getWeatherInfo(cityClicked);
}

function renderCities(loadCities){
    // Set the HTML of the UL to empty
    recentCityList.innerHTML = "";

    // Re-render the list
    for (let i = 0; i < loadCities.length; i++) {
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = loadCities[i];
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.appendChild(recentCityListItem);
    }
}

function errorInput(){
    // Add a class that defines an animation
    cityInputEl.classList.add('error');

    // remove the class after the animation completes
    setTimeout(function() {
        cityInputEl.classList.remove('error');
    }, 300);
}

loadRecent();

cityInputContainer.addEventListener("submit", inputSubmitHandler);
recentCityList.addEventListener("click", generateWeather);