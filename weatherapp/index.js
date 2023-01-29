const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
 // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    const getweather = async(city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        return showwheather(data);
    }

    const showwheather = (data)=>{
        weather.innerHTML = `
        <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
           <h2>${data.main.temp}&deg;C</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
        `
    }

    form.addEventListener(
        "submit",
        function(event){
            getweather(search.value)
            event.preventDefault();
        }
    )
