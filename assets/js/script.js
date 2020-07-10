async function getWeatherInfo(city) {
    try {
        let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=a0453456fb9621adaf5cc02de2936b37&q=${city}&lat={lat}&lon={lon}&cnt=5`
        let unformattedResponse = await fetch(apiUrl)
        let formattedResponse = await unformattedResponse.json()
        return formattedResponse;
    } catch (err) {
        return alert("Error")
    }
}