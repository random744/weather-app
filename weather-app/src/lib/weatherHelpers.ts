export function getWeatherIcon(weatherInfo: string): string | undefined {
  if (weatherInfo == "Clouds") {
    return "public/cloud.svg";
  }
  if (weatherInfo == "Clear") {
    return "public/sun.svg";
  }
  if (weatherInfo == "Rain") {
    return "public/rain.svg";
  }
  if (weatherInfo == "Drizzle") {
    return "public/drizzle.svg";
  }
  if (weatherInfo == "Mist") {
    return "public/mist.svg";
  }
}
