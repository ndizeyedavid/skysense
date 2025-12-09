import axios from "axios";

const baseAPI = import.meta.env.VITE_OPEN_METO_API;
const mlApi = import.meta.env.VITE_MY_ML_API;

export async function getWeatherData() {
  const res = await axios.get(baseAPI);

  return res;
}

export async function getCurrentWeather() {
  const res = await axios.get(baseAPI);

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
  const res = await axios.get(baseAPI);
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
    wind_speed_10m_max: dailyData.wind_speed_10m_max,
  };
}

export async function getHourlyForecastData() {
  const res = await axios.get(baseAPI);
  const hourlyData = res.data.hourly;
  const currentTime =
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;

  // Transform all metrics into Highcharts format, limiting to 7 data points
  const transformMetric = (metric: number[]) => {
    const step = Math.floor(hourlyData.time.length / 25);
    return hourlyData.time
      .filter((_: string, index: number) => index % step === 0)
      .slice(0, 12)
      .map((time: string, index: number) => [
        new Date(time).getTime(),
        metric[index * step],
      ]);
  };

  return {
    temperature: transformMetric(hourlyData.temperature_2m),
    humidity: transformMetric(hourlyData.relative_humidity_2m),
    cloudCover: transformMetric(hourlyData.cloud_cover),
    rain: transformMetric(hourlyData.rain),
    currentTime,
  };
}
export async function getHistoricalWeatherData() {
  try {
    const res = await axios.get(baseAPI);
    const hourlyData = res.data.hourly;

    // Transform metrics into Highcharts format, limiting to 24 data points (one per hour)
    const transformMetric = (metric: number[]) => {
      const step = Math.floor(hourlyData.time.length / 10);
      return hourlyData.time
        .filter((_: string, index: number) => index % step === 0)
        .slice(0, 10)
        .map((time: string, index: number) => [
          new Date(time).getTime(),
          metric[index * step],
        ]);
    };

    return {
      temperature: transformMetric(hourlyData.temperature_2m),
      humidity: transformMetric(hourlyData.relative_humidity_2m),
      cloudCover: transformMetric(hourlyData.cloud_cover),
      rain: transformMetric(hourlyData.rain),
    };
  } catch (error) {
    console.error("Error fetching historical weather data:", error);
    return {
      temperature: [],
      humidity: [],
      cloudCover: [],
      rain: [],
    };
  }
}

export async function makePredictions() {
  try {
    const response = await axios.get(mlApi);

    const items: any[] = Array.isArray(response?.data?.items)
      ? response.data.items
      : [];

    const sortedItems = items.sort(
      (a, b) =>
        new Date(a?.timestamp ?? 0).getTime() -
        new Date(b?.timestamp ?? 0).getTime()
    );

    return sortedItems.map((item: any) => ({
      id: item?._id ?? "",
      requestId: item?.request_id ?? "",
      label: item?.label ?? "",
      sequence: Number(item?.sequence ?? 0),
      timestamp: item?.timestamp ?? "",
      rainfall: Number(item?.values?.rainfall ?? 0),
      pressure: Number(item?.values?.pressure ?? 0),
      temperature: Number(item?.values?.temperature ?? 0),
      humidity: Number(item?.values?.humidity ?? 0),
    }));
  } catch (error) {
    console.error("Error making predictions:", error);
    throw error;
  }
}
