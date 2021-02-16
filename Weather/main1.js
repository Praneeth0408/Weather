const api = {
    key: "bbf9284fcf84b0cc2812563101b2c793",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
      fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
      .then(forecast => {
        return forecast.json();
      }).then(displayResults);
  }
  
  function displayResults (forecast) {
    let city = document.querySelector('.location .city');
    city.innerText = `${forecast.city.name}, ${forecast.city.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(forecast.list.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = forecast.list.weather[0].main;
  
    let hilow = document.querySelector('.high-low');
    hilow.innerText = `${(forecast.list.main.temp_min)}°C / ${(forecast.list.main.temp_max)}°C`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }