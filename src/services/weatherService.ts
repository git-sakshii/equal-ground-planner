export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastData {
  time: Date;
  temp: number;
  condition: string;
  icon: string;
  precipitation: number;
}

export async function getCurrentWeather(lat: number, lng: number): Promise<WeatherData | null> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenWeather API key not configured');
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    };
  } catch (error) {
    console.error('Weather fetch failed:', error);
    return null;
  }
}

export async function getHourlyForecast(lat: number, lng: number): Promise<ForecastData[]> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenWeather API key not configured');
    return [];
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Forecast fetch failed');
    
    const data = await response.json();

    return data.list.slice(0, 6).map((item: any) => ({
      time: new Date(item.dt * 1000),
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
      precipitation: Math.round(item.pop * 100),
    }));
  } catch (error) {
    console.error('Forecast fetch failed:', error);
    return [];
  }
}

export function getWeatherRecommendation(weather: WeatherData | null): string {
  if (!weather) return '';
  
  if (weather.condition === 'Rain' || weather.condition === 'Thunderstorm') {
    return '☂️ Rainy weather - Indoor venues recommended';
  }
  if (weather.temp > 30) {
    return '🌡️ Hot weather - Air-conditioned venues recommended';
  }
  if (weather.temp < 10) {
    return '❄️ Cold weather - Cozy indoor venues recommended';
  }
  if (weather.condition === 'Clear' && weather.temp >= 15 && weather.temp <= 28) {
    return '☀️ Perfect weather for outdoor venues!';
  }
  return '';
}
