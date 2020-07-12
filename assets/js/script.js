AOS.init();

let recentCitiesArray = [];

// Input Variables
const cityInputEl = document.querySelector("#city-input");
const cityInputContainer = document.querySelector(".city-selected");

// Recent City Search Variable
const recentCityList = document.querySelector(".list-group");

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
        // Try to fetch and format the cities data
        let initialFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=a0453456fb9621adaf5cc02de2936b37&q=${city}`);
        let initialFetchFormatted = await initialFetch.json();

        // Store the latitude and longitude of the city
        const cityLat = initialFetchFormatted.coord.lat;
        const cityLon = initialFetchFormatted.coord.lon;

        // Use the cities latitude and longitude to try to fetch and format its forecast
        const unformattedResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,minutely&units=imperial&appid=a0453456fb9621adaf5cc02de2936b37&q`);
        const formattedResponse = await unformattedResponse.json();
        
        // If the city has recently been searched for
        if (recentCitiesArray.includes(city)){
            // Populate its current and future forecasts only
            currentDayGenerator(formattedResponse.current, initialFetchFormatted.name);
            forecastGenerator(formattedResponse);
        } else {
            // Otherwise add the city to the list and populate the current and future forecasts
            recentCity(city);
            currentDayGenerator(formattedResponse.current, initialFetchFormatted.name);
            forecastGenerator(formattedResponse);
        }
    } catch (err) {
        // Add error animation for any issues
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

    // if city name is entered, text if it has accepted characters
    if (!regex.test(city)){
        getWeatherInfo(city);
        return cityInputEl.value = "";
    } else {
        return errorInput();
    }
}

function currentDayGenerator(current, name){
    // Capture and format todays' date
    let todaysDate = new Date(current.dt * 1000).toDateString();
    
    // Show the container
    currentWeatherContainer.classList.remove("before-click");
    // Allow it to fade up
    currentWeatherContainer.setAttribute("data-aos", "fade-up");
    // Display image corresponding with the days weather
    const weatherIcon = `<img src='http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png'>`

    
    // Populate the data of the current weather card
    citySearchedEl.innerHTML = `${name} (${todaysDate}) ${weatherIcon}`;
    cityTemperatureEl.innerHTML = `${current.temp}`;
    cityHumidityEl.innerHTML = `${current.humidity} %`;
    cityWindSpeedEl.innerHTML = `${current.wind_speed} MPH`;

    // Set background color and text content of UV index field based on value
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
    // Clear The 5 Day Forecast
    let forecastRowId = document.getElementById("forecast-row");
    forecastRowId.innerHTML = "";

    // Creates Forecast Cards
    for (let i = 1; i <= 5; i ++) {
        // create the div
        const forecastCard = document.createElement("div");
        forecastCard.setAttribute("data-aos", "fade-up");
        forecastCard.classList = "card border border-dark ml-2 p-3 cold-day col-5 col-md-4 col-lg-3 col-xl-2 forecast-item";

        // create the header
        const forecastHeader = document.createElement("h5");
        const newDate = new Date(forecast.daily[i].dt * 1000).toDateString();
        forecastHeader.textContent = newDate;
        forecastCard.append(forecastHeader);

        // create the img
        const weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + forecast.daily[i].weather[0].icon + ".png");
        weatherIcon.setAttribute("width", "50px");
        weatherIcon.setAttribute("height", "50px");
        forecastCard.appendChild(weatherIcon);

        // create Temperature
        const forecastTemp = document.createElement("p");
        forecastTemp.innerHTML = `Temp: ${forecast.daily[i].temp.day} <span>&#8457</span>`;
        forecastCard.appendChild(forecastTemp);

        // create Humidity
        const forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = `Humidity: ${forecast.daily[1].humidity}%`;
        forecastCard.appendChild(forecastHumidity);
        forecastCard.appendChild(forecastHumidity);

        // Append And Show Next Day Forecast
        forecastItemsContainer.appendChild(forecastCard);
        forecastContainer.classList.remove("before-click");
        forecastContainer.setAttribute("data-aos", "fade-up");
    }
}

function recentCity(city){
    // If there are no recent cities listed
    if (!recentCityList.innerHTML){
        // Create li and append to the list
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = city;
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.appendChild(recentCityListItem);
        return saveCitiesSearched(city);
    } 
    // If the list doesn't include the city
    else if (!recentCitiesArray.includes(city)){
        // If there are items on the list then prepend
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = city;
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.prepend(recentCityListItem);
        return saveCitiesSearched(city);
    }
    // If the city already exists
    else {
        return;
    }
}

function saveCitiesSearched(city){
    // If there are no cities in the array
    if (recentCitiesArray.length == 0){
        // push the city into the array
        recentCitiesArray.push(city);
    } 
    // If the length of the array is less than 8
    else if (recentCitiesArray.length < 8){
        // push the city to the beginning of the array
        recentCitiesArray.unshift(city);
    } 
    // If there are 8 or more cities in the array
    else if (recentCitiesArray.length >= 8){
        // push the new city to the beginning of the array
        recentCitiesArray.unshift(city);
        // set array to only equal cities 1-8
        recentCitiesArray = recentCitiesArray.slice(0,8);
        // Remove last city searched
        recentCityList.removeChild(recentCityList.childNodes[8]);
    }

    // Save array into localStorage
    localStorage.setItem("recent", JSON.stringify(recentCitiesArray));
    // Re-render cities
    renderCitiesSearched(recentCitiesArray);
}

function loadRecent(){
    // If there are recent cities in localStorage
    if ("recent" in localStorage){
        let loadedCities = [];
        loadedCities = JSON.parse(localStorage.getItem("recent"));
        recentCitiesArray = loadedCities;
        renderCitiesSearched(loadedCities)
    }
}

function generateWeather(event){
    // Take the city clicked
    let cityClicked = event.target.textContent;
    // Generate its information
    getWeatherInfo(cityClicked);
}

function renderCitiesSearched(cities){
    // Set the HTML of the the  to empty
    recentCityList.innerHTML = "";

    // Re-render the list
    for (let i = 0; i < cities.length; i++) {
        const recentCityListItem = document.createElement("li");
        recentCityListItem.textContent = cities[i];
        recentCityListItem.classList = "list-group-item text-center";
        recentCityList.appendChild(recentCityListItem);
    }
}

function errorInput(){
    // Add error animation
    cityInputEl.classList.add('error');
    // Set input value to empty
    cityInputEl.value = "";

    // remove the class after the animation completes
    setTimeout(function() {
        cityInputEl.classList.remove('error');
    }, 300);
}

loadRecent();

cityInputContainer.addEventListener("submit", inputSubmitHandler);
recentCityList.addEventListener("click", generateWeather);