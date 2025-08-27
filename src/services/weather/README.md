# Weather Service Documentation

## Overview
The Weather Service is a centralized data handling system that manages weather data for the application. It currently loads data from a local JSON file but is designed to easily switch to an API data source when needed.

## Usage

### Getting the Service Instance
```typescript
import { weatherService } from '@/services/weather/weatherService';
```

### Available Methods
- `getCurrentWeather()`: Get current weather conditions
- `getHourlyForecast()`: Get hourly weather forecast
- `getDailyForecast()`: Get daily weather forecast

### Switching Data Sources

#### Using Local JSON Data (Default)
```typescript
// The service uses local JSON by default
// No configuration needed
```

#### Switching to API Data Source
```typescript
// When ready to use an API
weatherService.setDataSource('api', 'https://api.weather.example.com');
```

## Data Structure
The weather data follows a consistent structure whether it comes from the local JSON file or an API:

```typescript
interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    // ... other current weather properties
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    // ... other hourly forecast properties
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    // ... other daily forecast properties
  };
}
```

## Implementation Steps for API Integration

1. Update the `fetchWeatherData` method in `weatherService.ts`:
```typescript
private async fetchWeatherData(): Promise<WeatherData> {
  if (this.dataSource === 'local') {
    const response = await fetch(this.localDataPath);
    return response.json();
  } else {
    const response = await fetch(`${this.apiBaseUrl}/weather`);
    const data = await response.json();
    return this.transformApiResponse(data); // Transform API data to match WeatherData interface
  }
}
```

2. Add any necessary data transformation methods:
```typescript
private transformApiResponse(apiData: any): WeatherData {
  // Transform API response to match WeatherData interface
  return {
    current: {
      temperature_2m: apiData.current.temp,
      // ... map other properties
    },
    // ... transform hourly and daily data
  };
}
```

## Best Practices
1. Always use the weatherService methods instead of fetching data directly
2. Handle loading and error states in components
3. Implement proper error handling in the service
4. Cache responses when appropriate
5. Add retry logic for failed API calls