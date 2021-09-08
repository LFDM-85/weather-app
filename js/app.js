window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description',
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  const apikey = '49bc505ee626bca847993988103bd567';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const { name } = data;

          const temperature = temp - 273.15;

          // Set DOM elements from the API

          temperatureDegree.textContent = temperature.toFixed(1) + ' ºC';
          temperatureDescription.textContent = description.toUpperCase();
          locationTimezone.textContent = name;

          let img = document.createElement('img');
          img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          document.querySelector('.location').appendChild(img);
        });
    });
  }
});
