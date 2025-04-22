const tempEle = document.querySelector('#temp');
const humidityEle = document.querySelector('#humidity');
const windSpeedEle = document.querySelector('#windspeed');
const cityEle = document.querySelector('#city');
const weatherIcon = document.querySelector('#weatherIcon');
let cityInput = document.querySelector('#cityInput');
const dateEle = document.querySelector('#date');

const apiKey = "d7bc6c7a9f124c94640b4081cd52253d";
const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

async function checkWeather() {
    try {
        const response = await fetch(url + `&appid=${apiKey}&q=${cityInput.value}`);
        
        if (response.status == 404) {
            alert("Invalid city name");
        }

        const data = await response.json();

        const city = data.name;
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        let weather = data.weather[0].main;

        // Weather image condition
        if (weather === 'Clouds') weatherIcon.src = "images/clouds.png";
        else if (weather === 'Clear') weatherIcon.src = "images/clear.png";
        else if (weather === 'Rain') weatherIcon.src = "images/rain.png";
        else if (weather === 'Drizzle') weatherIcon.src = "images/drizzle.png";
        else if (weather === 'Mist') weatherIcon.src = "images/mist.png";

        // Date formatting
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = today.toLocaleDateString('en-GB', options);

        // Update UI
        dateEle.innerHTML = `${date}`;
        cityEle.innerHTML = `${city}`;
        tempEle.innerHTML = `${temp}&deg C`;
        humidityEle.innerHTML = `${humidity}%`;
        windSpeedEle.innerHTML = `${windSpeed} Km/h`;

    } catch (error) {
        console.error("Something went wrong: ", error);
    }
}

console.log(new Date().toDateString());
