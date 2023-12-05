const processWeatherData = async (data) => {
  const sorted = [...data].sort((a, b) => b.temperatura - a.temperatura);

  sorted.forEach((currentStation) => {
    const { stacja: station, temperatura: temperature } = currentStation;
    console.log(`In the station ${station} is ${temperature}°C.`);
  });
};

const getAllPlacesWeather = async () => {
  try {
    const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await res.json();
    await processWeatherData(data);
  } catch (err) {
    console.log('Error has occured', err);
  }
};

getAllPlacesWeather();
