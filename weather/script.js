document.getElementById("search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const city = document.getElementById("search").value.trim();
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function fetchWeatherData(city) {
    const apiKey = '3a33c21bd5e3f781419356bc5a89f43c'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeatherData(data) {
    const temperature = `${Math.round(data.main.temp)}°C`;
    const cityName = data.name;
    const date = new Date().toLocaleString();
    const condition = data.weather[0].description;
    const humidity = `${data.main.humidity}%`;
    const wind = `${data.wind.speed} km/h`;
    const precipitation = data.clouds.all ? `${data.clouds.all}%` : "N/A"; 
    const iconCode = data.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    document.querySelector(".temperature").textContent = temperature;
    document.querySelector(".city-name").textContent = cityName;
    document.querySelector(".date-time").textContent = date;
    document.querySelector(".condition img").src = weatherIconUrl;
    document.querySelector(".condition span").textContent = condition;
    document.querySelectorAll(".detail-box p")[0].textContent = humidity;
    document.querySelectorAll(".detail-box p")[1].textContent = wind;
    document.querySelectorAll(".detail-box p")[2].textContent = precipitation;
    document.querySelectorAll(".detail-box p")[3].textContent = "N/A"; 
    document.querySelectorAll(".detail-box p")[4].textContent = "N/A"; 
}

async function fetchForecastData(city) {
    const apiKey = '3a33c21bd5e3f781419356bc5a89f43c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const forecastData = await response.json();
        displayForecastData(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

function displayForecastData(data) {
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "<h2>7-Day Forecast</h2>";


    const dailyForecasts = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: 'long' });
        const iconCode = forecast.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        const highTemp = `${Math.round(forecast.main.temp_max)}°C`;
        const lowTemp = `${Math.round(forecast.main.temp_min)}°C`;

        const forecastItem = `
            <div class="forecast-item">
                <h3>${day}</h3>
                <img src="${weatherIconUrl}" alt="Weather Icon">
                <p>High: ${highTemp}</p>
                <p>Low: ${lowTemp}</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastItem;
    });
}
