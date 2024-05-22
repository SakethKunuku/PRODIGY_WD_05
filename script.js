const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    let city = document.querySelector('.location .city');
    let date = document.querySelector('.location .date');

    if (!query) {
        city.innerText = 'Please enter a city';
        date.innerText = '';
        clearResults(); 
        return;
    }

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Please enter a valid city Name');
            }
            return response.json();
        })
        .then(displayResults)
        .catch(err => {
            city.innerText = err.message;
            date.innerText = '';
            clearResults(); 
        });
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    let date = document.querySelector('.location .date');

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function clearResults() {
    let temp = document.querySelector('.current .temp');
    let weather_el = document.querySelector('.current .weather');
    let hilow = document.querySelector('.hi-low');

    temp.innerHTML = '';
    weather_el.innerText = '';
    hilow.innerText = '';
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
