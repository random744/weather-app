import type { Day } from "./interfaces";
import { getWeatherIcon } from "./weatherHelpers";

const apiKey = "abd4126e532e4dce6a7362ced27f04e8";

const locale = "de-CH";
const numDecimals = 0;
const formatter = new Intl.NumberFormat(locale, {
  maximumFractionDigits: numDecimals,
});

export interface WeatherResponse {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  icon: string | undefined;
  forecast: Day[];
}

export async function checkWeather(
  city: string
): Promise<WeatherResponse | null> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}`
  );
  const data = await response.json();

  if (response.ok) {
    let city = data.name;
    let temp = Math.round(data.main.temp - 273.15);
    let humidity = data.main.humidity;
    let wind = data.wind.speed;

    let icon = getWeatherIcon(data.weather[0].main);

    let location = await getLocation(city);
    let forecast = await getForecast(location);
    return {
      city,
      temperature: temp,
      humidity,
      wind,
      icon,
      forecast: forecast,
    };
  }
  return null;
}

async function getLocation(city: string): Promise<any> {
  let endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city},CH&appid=${apiKey}`;
  let response = await fetch(endpoint);

  if (response.ok) {
    let locations = await response.json();
    return locations[0];
  }
}

async function getForecast(location: any): Promise<Day[]> {
  let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`;
  let response = await fetch(endpoint);
  let results = [];

  if (response.ok) {
    let result = await response.json();

    for (const forecastEntry of result.list) {
      let date = new Date(forecastEntry.dt_txt);
      let icon = getWeatherIcon(forecastEntry.weather[0].main);

      let currentDate = new Date().getDate();
      if (date.getDate() == currentDate) {
        continue;
      }

      if (date.getHours() == 12) {
        let day: Day = {
          dayName: date.toLocaleDateString("ch-de", {
            weekday: "long",
          }),
          readableDate: date.toLocaleDateString("ch-de"),
          averageTemp:
            formatter.format(forecastEntry.main.temp - 273.15) + " °C",
          icon,
        };

        results.push(day);
      }
    }
  }
  return results.slice(0, 4);
}
