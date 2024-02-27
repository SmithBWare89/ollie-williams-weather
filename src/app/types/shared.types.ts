type WeatherDescription = {
  description: string;
  icon: string;
  iconId: number;
  main: string;
};

type CurrentWeatherType = {
  dewPoint: number;
  cloudCover: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  weather: WeatherDescription[];
  windSpeed: number;
  date: number;
};

type ForecastTemperatureType = {
  day: number;
  min: number;
  max: number;
};

type WeatherForecastType = {
  dewPoint: number;
  cloudCover: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  uvi: number;
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
