const API_KEY = //type the api key;

// Get locationKey for the queried city
const getCityInfo = async(city) => {
        const url_location = "http://dataservice.accuweather.com/locations/v1/cities/search";
        const query_location = `?apikey=${API_KEY}&q=${city}`;

        const response = await fetch(url_location + query_location);
        const data = await response.json();
        
        return data[0].Key;
};

const getWeatherInfo = async(city) => {

        const locationKey = await getCityInfo(city);

        const url_weather = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
        const apikey = `?apikey=${API_KEY}`;

        const response = await fetch(url_weather + apikey);
        const data = await response.json();

        return {city:locationKey, weather:data[0]};
};