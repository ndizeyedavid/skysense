import type { WeatherData } from "./types";

class WeatherService {
  private static instance: WeatherService;
  private dataSource: "local" | "api" = "local";
  private localDataPath = "/sample/data.json";
  private apiBaseUrl = "";

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public setDataSource(source: "local" | "api", apiBaseUrl?: string) {
    this.dataSource = source;
    if (source === "api" && apiBaseUrl) {
      this.apiBaseUrl = apiBaseUrl;
    }
  }

  public async getCurrentWeather(): Promise<WeatherData["current"]> {
    const data = await this.fetchWeatherData();
    return data.current;
  }

  public async getHourlyForecast(): Promise<WeatherData["hourly"]> {
    const data = await this.fetchWeatherData();
    return data.hourly;
  }

  public async getDailyForecast(): Promise<WeatherData["daily"]> {
    const data = await this.fetchWeatherData();
    return data.daily;
  }

  private async fetchWeatherData(): Promise<WeatherData> {
    if (this.dataSource === "local") {
      const response = await fetch(this.localDataPath);
      return response.json();
    } else {
      // Implement API fetching logic here when needed
      throw new Error("API fetching not implemented yet");
    }
  }
}

export const weatherService = WeatherService.getInstance();
