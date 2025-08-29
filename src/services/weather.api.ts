import axios from "axios";

export async function getWeatherData() {
  const res = await axios.get("/data/sample.json");

  return res;
}

export async function getCurrentWeather() {
  const res = await axios.get("/data/sample.json");

  const currentData = res.data.current;

  const dailyData = res.data.daily;
  const dataFromDaily = {
    temperature_2m_max: dailyData.temperature_2m_max[0],
    temperature_2m_min: dailyData.temperature_2m_min[0],
    precipitation_sum: dailyData.precipitation_sum[0],
    precipitation_probability_max: dailyData.precipitation_probability_max[0],
  };

  return { ...currentData, ...dataFromDaily };
}

export async function getDayForecastedData() {
  const res = await axios.get("/data/sample.json");
  const dailyData = res.data.daily;

  return {
    time: dailyData.time.map((t: string) => new Date(t)),
    temperature_2m_max: dailyData.temperature_2m_max,
    sunrise: dailyData.sunrise.map((t: string) => new Date(t)),
    sunset: dailyData.sunset.map((t: string) => new Date(t)),
    precipitation_sum: dailyData.precipitation_sum,
    precipitation_probability_max: dailyData.precipitation_probability_max,
    uv_index_clear_sky_max: dailyData.uv_index_clear_sky_max,
    temperature_2m_min: dailyData.temperature_2m_min,
    rain_sum: dailyData.rain_sum,
    wind_speed_10m_max: dailyData.wind_speed_10m_max
  };
}
