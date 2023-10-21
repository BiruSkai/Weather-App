const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const cardDetails = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = async(data) => {
        console.log(data)
         //Set Card Image
         let timeSrc = null;
         if(data.dayTime){
                 timeSrc = "img/day.svg"
         }else {
                 timeSrc = "img/night.svg"
         };
 
         time.setAttribute("src", timeSrc);
 
         //Set Icon
         let iconImg = `img/icons/${data.weatherIcon}.svg`
         icon.setAttribute("src", iconImg);
 
         //Set Weather Detail
        cardDetails.innerHTML = `
                <h5 class="my-3">${data.cityInput}</h5>
                <div class="my-3">${data.weatherText}</div>
                <div class="display-4 my-4">
                        <span>${data.temperature}</span>
                        <span>&deg;C</span>
                </div>
        `
         //Remove d-none class
         if(card.classList.contains("d-none")){
                card.classList.remove("d-none");
         };
};


//Fetch data from other js.
const weatherData = async(city) => {
        const data = await getWeatherInfo(city)

        const cityInput = city;
        const temperature = data.weather.Temperature.Metric.Value;
        const weatherText = data.weather.WeatherText
        const weatherIcon = data.weather.WeatherIcon;
        const dayTime = data.weather.IsDayTime;

        return {cityInput, temperature, weatherText, weatherIcon, dayTime};
};

//Listen to Input
document.addEventListener("submit", async(e) => {
        e.preventDefault();

        const cityInput = cityForm.city.value.trim();
        cityForm.reset();

        weatherData(cityInput);

        weatherData(cityInput)
                .then(data => updateUI(data))
                .catch(err => console.log(err));

});
