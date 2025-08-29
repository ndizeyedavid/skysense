export interface dayForecastData {
  time: Date[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: Date[];
  sunset: Date[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  uv_index_clear_sky_max: number[];
  rain_sum: number[];
  wind_speed_10m_max: number[];
}
