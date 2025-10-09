import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { getCurrentWeather, WeatherData, getWeatherRecommendation } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherWidgetProps {
  lat: number;
  lng: number;
}

const WeatherWidget = ({ lat, lng }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const data = await getCurrentWeather(lat, lng);
      setWeather(data);
      setLoading(false);
    };

    fetchWeather();
  }, [lat, lng]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-24 w-full" />
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  const recommendation = getWeatherRecommendation(weather);

  return (
    <Card className="p-4 sm:p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">Weather at meetup area</p>
          <div className="flex items-center gap-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <p className="text-3xl font-bold">{weather.temp}°C</p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather.description}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right text-sm space-y-1">
          <div className="flex items-center justify-end gap-2 text-muted-foreground">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-muted-foreground">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
        </div>
      </div>

      {recommendation && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm">
          {recommendation}
        </div>
      )}
    </Card>
  );
};

export default WeatherWidget;
