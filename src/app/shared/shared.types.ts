type WeatherDescription = {
  description: string;
  icon: string;
  iconId: number;
  main: string;
};

export type CurrentWeatherType = {
  dewPoint: number;
  cloudCover: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  humidity: number;
  weather: WeatherDescription[];
  windSpeed: number;
  date: number;
  city?: string;
};

type ForecastTemperatureType = {
  day: number;
  min: number;
  max: number;
};

export type WeatherForecastType = {
  dewPoint: number;
  cloudCover: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  uvi: number;
  humidity: number;
  weather: WeatherDescription[];
  windSpeed: number;
  date: number;
  temp: ForecastTemperatureType;
};

export type ForecastType = {
  currentForecast: CurrentWeatherType;
  fiveDayForecast: WeatherForecastType[];
  latitude: string;
  longitude: string;
};
