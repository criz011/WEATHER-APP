// Import SVGs as React Components
import Sunny from '../assets/weather-icons/sunny.svg';
import Clear from '../assets/weather-icons/clear.svg';
import PartlyCloudy from '../assets/weather-icons/partly_cloudy.svg';
import Cloudy from '../assets/weather-icons/cloudy.svg';
import Fog from '../assets/weather-icons/fog.svg';
import Drizzle from '../assets/weather-icons/drizzle.svg';
import Showers from '../assets/weather-icons/showers.svg';
import HeavySnow from '../assets/weather-icons/heavy_snow.svg';
import SnowShowers from '../assets/weather-icons/snow_showers.svg';
import Thunderstorm from '../assets/weather-icons/strong_tstorms.svg';
import Windy from '../assets/weather-icons/wind.svg';

// Thrissur Coordinates
const LAT = 10.5276;
const LON = 76.2144;

export interface WeatherData {
    current: {
        temp: number;
        feelsLike: number;
        condition: string;
        icon: any; // SVG Component
        high: number;
        low: number;
        windSpeed: number;
        rainChance: number;
        pressure: number;
        uvIndex: number;
        isDay: boolean;
        // Diffs
        windSpeedDiff?: number;
        rainChanceDiff?: number;
        pressureDiff?: number;
        uvIndexDiff?: number;
    };
    hourly: HourlyForecastItem[];
    daily: DailyForecastItem[];
    astro: {
        sunrise: string;
        sunset: string;
        sunriseDiff: string;
        sunsetDiff: string;
    };
}

export interface HourlyForecastItem {
    time: string; // "10 AM"
    temp: number;
    icon: any;
    isNow: boolean;
    rainChance: number; // For the RainChanceChart
}

export interface DailyForecastItem {
    day: string; // "Mon"
    date: string; // "18 Jan"
    high: number;
    low: number;
    icon: any;
    condition: string;
}

// Map WMO Weather Codes to Conditions & Icons
export const getWeatherCodeData = (code: number, isDay: number = 1) => {
    // 0: Clear sky
    if (code === 0) return { condition: 'Clear', icon: isDay ? Sunny : Clear };

    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if (code === 1) return { condition: 'Mainly Clear', icon: isDay ? Sunny : Clear };
    if (code === 2) return { condition: 'Partly Cloudy', icon: PartlyCloudy };
    if (code === 3) return { condition: 'Overcast', icon: Cloudy };

    // 45, 48: Fog
    if (code === 45 || code === 48) return { condition: 'Fog', icon: Fog };

    // 51, 53, 55: Drizzle
    if ([51, 53, 55].includes(code)) return { condition: 'Drizzle', icon: Drizzle };

    // 56, 57: Freezing Drizzle
    if ([56, 57].includes(code)) return { condition: 'Freezing Drizzle', icon: Drizzle };

    // 61, 63, 65: Rain
    if ([61, 63, 65].includes(code)) return { condition: 'Rain', icon: Showers };

    // 66, 67: Freezing Rain
    if ([66, 67].includes(code)) return { condition: 'Freezing Rain', icon: Showers };

    // 71, 73, 75: Snow fall
    if ([71, 73, 75].includes(code)) return { condition: 'Snow', icon: HeavySnow };

    // 77: Snow grains
    if (code === 77) return { condition: 'Snow', icon: HeavySnow };

    // 80, 81, 82: Rain showers
    if ([80, 81, 82].includes(code)) return { condition: 'Showers', icon: Showers };

    // 85, 86: Snow showers
    if ([85, 86].includes(code)) return { condition: 'Snow Showers', icon: SnowShowers };

    // 95, 96, 99: Thunderstorm
    if ([95, 96, 99].includes(code)) return { condition: 'Thunderstorm', icon: Thunderstorm };

    return { condition: 'Unknown', icon: Cloudy };
};

export const fetchWeatherData = async (): Promise<WeatherData | null> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,pressure_msl&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,is_day,uv_index,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=14`
        );
        const data = await response.json();

        const current = data.current;
        const daily = data.daily;
        const hourly = data.hourly;

        const weatherCodeData = getWeatherCodeData(current.weather_code, current.is_day);

        // Map Hourly Data (Next 24 hours)
        const currentHourIndex = new Date().getHours();

        const mappedHourly: HourlyForecastItem[] = [];

        for (let i = currentHourIndex; i < currentHourIndex + 24; i++) {
            // Safety check
            if (!hourly.time[i]) break;

            const hCode = hourly.weather_code[i];
            const hIsDay = hourly.is_day[i];
            const hData = getWeatherCodeData(hCode, hIsDay);

            // Format time: "10 AM"
            const d = new Date(hourly.time[i]);
            const hours = d.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12 || 12} ${ampm}`;

            mappedHourly.push({
                time: i === currentHourIndex ? 'Now' : formattedTime,
                temp: Math.round(hourly.temperature_2m[i]),
                icon: hData.icon,
                isNow: i === currentHourIndex,
                rainChance: hourly.precipitation_probability[i] || 0
            });
        }

        // Map Daily Data
        const mappedDaily: DailyForecastItem[] = daily.time.map((time: string, index: number) => {
            const d = new Date(time);
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon"
            const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // "18 Jan"
            const code = daily.weather_code[index];
            const wData = getWeatherCodeData(code);

            return {
                day: dayName,
                date: dateStr,
                high: Math.round(daily.temperature_2m_max[index]),
                low: Math.round(daily.temperature_2m_min[index]),
                icon: wData.icon,
                condition: wData.condition
            };
        });

        // Calculate Trends (Current vs 3 Hours Ago)
        const prevHourIndex = currentHourIndex > 3 ? currentHourIndex - 3 : 0;

        const hourlyPressureH0 = hourly.pressure_msl ? hourly.pressure_msl[prevHourIndex] : current.pressure_msl;
        const hourlyWindH0 = hourly.wind_speed_10m ? hourly.wind_speed_10m[prevHourIndex] : current.wind_speed_10m;
        const hourlyUvH0 = hourly.uv_index ? hourly.uv_index[prevHourIndex] : 0;
        const currentUv = hourly.uv_index ? hourly.uv_index[currentHourIndex] : 0;

        return {
            current: {
                temp: Math.round(current.temperature_2m),
                feelsLike: Math.round(current.apparent_temperature),
                condition: weatherCodeData.condition,
                icon: weatherCodeData.icon,
                high: Math.round(daily.temperature_2m_max[0]),
                low: Math.round(daily.temperature_2m_min[0]),
                windSpeed: Math.round(current.wind_speed_10m),
                rainChance: hourly.precipitation_probability[currentHourIndex] || 0, // Current hour rain chance
                pressure: Math.round(current.pressure_msl),
                uvIndex: currentUv, // Use Current UV (was daily max)
                isDay: !!current.is_day,

                // Diff Values
                windSpeedDiff: parseFloat((current.wind_speed_10m - hourlyWindH0).toFixed(1)),
                pressureDiff: Math.round(current.pressure_msl - hourlyPressureH0),
                rainChanceDiff: (hourly.precipitation_probability[currentHourIndex] || 0) - (hourly.precipitation_probability[prevHourIndex] || 0),
                uvIndexDiff: parseFloat((currentUv - hourlyUvH0).toFixed(1))
            },
            hourly: mappedHourly,
            daily: mappedDaily,
            astro: {
                sunrise: new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sunset: new Date(daily.sunset[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sunriseDiff: "4h ago", // TODO: Implement real diff
                sunsetDiff: "in 7h",   // TODO: Implement real diff
            }
        };

    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};
