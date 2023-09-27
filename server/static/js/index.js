const mode = document.querySelectorAll(".mode");
var Current,
  locationdata,
  apikey,
  currentplace,
  notpermitted = true;

const throwerr = (err) => {
  const errorbody = document.createElement("div");
  errorbody.innerText = err;
  errorbody.classList.add("errbody");
  const exile = document.querySelector(".exile");
  exile.appendChild(errorbody);
  setTimeout(() => {
    exile.removeChild(errorbody);
  }, 3000);
};

const getkey = async (val) => {
  try {
    if (apikey) {
      getdata(apikey, val);
    } else {
      const url = "http://localhost:9310/env";
      const data = await fetch(url);
      const { key } = await data.json();
      if (!key || key == "") {
        throw { err: "no key" };
      }
      getdata(key, val);
    }
  } catch (error) {
    console.log(error);
    throwerr(error.err);
  }
};

const getdata = async (key, val) => {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${val}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const { current, location } = await response.json();
    if (!current && !location) {
      throw { err: "check the city name" };
    }
    console.log(current, location);

    Current = current;
    locationdata = location;
    asignvalue(current, location);
  } catch (error) {
    console.log(error);
    throwerr(error.err);
  }
};

const asignvalue = (current, location) => {
  const { name, country, lat, localtime, lon, tz_id, region } = location;
  const { condition, temp_c, temp_f, cloud, gust_kph, gust_mph, humidity } =
    current;
  const { icon, text } = condition;

  const place = document.querySelector(".place");
  const weathericon = document.querySelector(".w_icon");
  const weather = document.querySelector(".weather");
  const temp = document.querySelector(".temp");
  const country_name = document.querySelector(".country");
  const region_name = document.querySelector(".region");
  const lattitude = document.querySelector(".lat");
  const longiitude = document.querySelector(".lon");
  const localtim = document.querySelector(".localtime");
  const timezone = document.querySelector(".timezone");
  const cloudpercentage = document.querySelector(".cloud");
  const gust = document.querySelector(".gust");
  const hum = document.querySelector(".humidity");

  const date = new Date(localtime);

  let speedunit, tempunit;

  mode.forEach((m) => {
    let type = m.getAttribute("type-data");

    switch (type) {
      case "speed":
        speedunit = m.title;
        break;

      case "temp":
        tempunit = m.title;
        break;

      default:
        break;
    }
  });
  place.innerText = name;
  weathericon.src = icon;
  weather.innerText = text;
  temp.innerText = tempunit == "celcius" ? temp_c : temp_f;
  country_name.innerText = country;
  region_name.innerText = region;
  lattitude.innerText = lat;
  longiitude.innerText = lon;
  localtim.innerText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  timezone.innerText = tz_id;
  cloudpercentage.innerText = cloud || 0;
  gust.innerText = speedunit == "km" ? gust_kph : gust_mph;
  hum.innerText = humidity || 0;
};

async function search() {
  try {
    const place = document.querySelector("#place_input");
    let val = place.value;
    if (val) {
      if (val != currentplace) {
        currentplace = val;
        getkey(val);
      }
    } else {
      throw { err: "Please provide a existing city name." };
    }
  } catch (error) {
    throwerr(error.err);
  }
}

mode.forEach((m) => {
  m.addEventListener("click", function () {
    const type = m.getAttribute("type-data");
    if (type == "speed") {
      m.title == "km" ? (m.title = "m") : (m.title = "km");
    } else {
      m.title == "celcius" ? (m.title = "fahrenheit") : (m.title = "celcius");
    }
    if (Current || locationdata) {
      asignvalue(Current, locationdata);
    }
  });
});

function askpermission() {
  if (notpermitted) {
    const div = document.createElement("div");
    div.classList.add("permissionbox");
    div.innerHTML = `
	<div>
	<h2>Enable your location</h2>
	<p>We won't get your location it is just using your geolocation to show current weather condition</p>
	<div>
	<button onclick="usecurloc(true)">yes<button/>
	<button onclick="usecurloc(false)">No<button/>
	</div>
	
	</div>
	`;
    document.body.appendChild(div);
  } else {
    usecurloc(true);
  }
}

const usecurloc = (permission) => {
  try {
    if (permission) {
      notpermitted = false;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show);
      } else {
        throw { err: "Geolocation is not supported by this browser." };
      }

      function show(position) {
        const { coords } = position;
        const { latitude, longitude } = coords;
        getkey(`${latitude},${longitude}`);
      }
    } else {
      notpermitted = true;
    }
    const div = document.querySelector(".permissionbox");
    div && document.body.removeChild(div);
  } catch (error) {
    error.err ? throwerr(error.err) : throwerr(error);
  }
};
