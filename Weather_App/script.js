const apiKey = '25be9aa52216be6162b4aae0abb38cb8'

function getWeather(cityName = null) {
  const city = cityName || document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Save to history
  if (!cityName) saveToHistory(city);

  // Current weather
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      const weatherDiv = document.getElementById('weatherResult');
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${icon}" alt="icon" />
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
    });

  // 5-day forecast
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
      const forecastDiv = document.getElementById('forecast');
      forecastDiv.innerHTML = '<h3>📆 5-Day Forecast</h3>';

      const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      filtered.forEach(item => {
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const date = new Date(item.dt_txt).toDateString();

        forecastDiv.innerHTML += `
          <div style="margin: 10px 0;">
            <strong>${date}</strong><br/>
            <img src="${icon}" alt="icon" />
            <p>${item.main.temp} °C, ${item.weather[0].description}</p>
          </div>
        `;
      });
    });
}

function saveToHistory(city) {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  if (!history.includes(city)) {
    history.unshift(city);
    localStorage.setItem('history', JSON.stringify(history));
    showHistory();
  }
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const list = document.getElementById('searchHistory');
  list.innerHTML = '';
  history.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => getWeather(city);
    list.appendChild(li);
  });
}

function saveFavorite() {
  const city = document.getElementById('cityInput').value;
  if (city) {
    localStorage.setItem('favoriteCity', city);
    showFavorite();
  }
}

function showFavorite() {
  const favCity = localStorage.getItem('favoriteCity');
  const favDiv = document.getElementById('favoriteCity');
  if (favCity) {
    favDiv.innerHTML = `❤️ Favorite City: <strong>${favCity}</strong> <button onclick="getWeather('${favCity}')">Check</button>`;
  }
}

// Initial setup
showHistory();
showFavorite();
