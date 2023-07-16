const processWeatherData = async (data, type) => {
  const sorted = [...data].sort((a, b) => b.temperatura - a.temperatura);

  if (type === 'coldest') {
    sorted.reverse();
  }

  const messageType = type === 'coldest' ? 'lowest' : 'highest';

  const { stacja: station, temperatura: temperature } = sorted[0];

  console.log(`The ${messageType} temperature ${temperature}°C is in ${station}.`);
};

const findWarmestPlaceInPoland = async () => {
  try {
    const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await res.json();
    await processWeatherData(data, 'warmest');
  } catch (err) {
    console.log('Error has occured', err);
  }
};

const findColdestPlaceInPoland = async () => {
  try {
    const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await res.json();
    await processWeatherData(data, 'coldest');
  } catch (err) {
    console.log('Error has occured', err);
  }
};

findWarmestPlaceInPoland();
findColdestPlaceInPoland();
