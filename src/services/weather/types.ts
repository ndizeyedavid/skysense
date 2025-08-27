export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    is_day: string;
    precipitation: string;
    rain: string;
    cloud_cover: string;
    surface_pressure: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number;
    precipitation: number;
    rain: number;
    cloud_cover: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    rain: string;
    wind_speed_10m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
    cloud_cover: string;
    surface_pressure: string;
    visibility: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    rain: number[];
    wind_speed_10m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    cloud_cover: number[];
    surface_pressure: number[];
    visibility: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    rain_sum: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    rain_sum: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}
