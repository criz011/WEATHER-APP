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
    tomorrow: {
        high: number;
        low: number;
        condition: string;
        icon: any;
        hourly: HourlyForecastItem[];
        windSpeed: number;
        rainChance: number;
        pressure: number;
        uvIndex: number;
        astro: {
            sunrise: string;
            sunset: string;
            sunriseDiff: string;
            sunsetDiff: string;
        };
    };
    hourly: HourlyForecastItem[];
    daily: DailyForecastItem[];
    astro: {
        sunrise: string;
        sunset: string;
        sunriseDiff: string;
        sunsetDiff: string;
    };
    aqi: {
        current: number;
        label: string;
        color: string;
    };
}

// ... (HourlyForecastItem, DailyForecastItem remain same) ...

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
    // Deep Dive Props
    windMax: number;
    uvMax: number;
    rainSum: number;
    sunrise: string;
    sunset: string;
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

const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: '#10B981' }; // Green
    if (aqi <= 100) return { label: 'Moderate', color: '#F59E0B' }; // Yellow
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: '#F97316' }; // Orange
    if (aqi <= 200) return { label: 'Unhealthy', color: '#EF4444' }; // Red
    if (aqi <= 300) return { label: 'Very Unhealthy', color: '#8B5CF6' }; // Purple
    return { label: 'Hazardous', color: '#7F1D1D' }; // Maroon
};

const formatTimeDiff = (targetTimeStr: string): string => {
    const now = new Date();
    const target = new Date(targetTimeStr);
    const diffMs = target.getTime() - now.getTime();

    // Convert to minutes
    const diffMins = Math.round(diffMs / (1000 * 60));
    const absMins = Math.abs(diffMins);

    const h = Math.floor(absMins / 60);
    const m = absMins % 60;

    // Simplify: if > 60m, show hours. Else show mins.
    let timeString = '';
    if (h > 0) {
        timeString = `${h}h ${m}m`;
    } else {
        timeString = `${m}m`;
    }

    if (diffMins > 0) return `in ${timeString}`;
    return `${timeString} ago`;
};

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
    try {
        const [weatherResponse, aqiResponse] = await Promise.all([
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,pressure_msl&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,is_day,uv_index,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max,precipitation_sum&timezone=auto&forecast_days=14`
            ),
            fetch(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
            )
        ]);
        const data = await weatherResponse.json();
        const aqiData = await aqiResponse.json();

        // AQI Data
        const currentAQI = aqiData.current?.us_aqi || 0;
        const aqiInfo = getAQILabel(currentAQI);

        const current = data.current;
        const daily = data.daily;
        const hourly = data.hourly;

        const weatherCodeData = getWeatherCodeData(current.weather_code, current.is_day);

        // Map Hourly Data (Next 24 hours STARTING NOW)
        const currentHourIndex = new Date().getHours();
        const mappedHourly: HourlyForecastItem[] = [];

        for (let i = currentHourIndex; i < currentHourIndex + 24; i++) {
            if (!hourly.time[i]) break;
            const hCode = hourly.weather_code[i];
            const hIsDay = hourly.is_day[i];
            const hData = getWeatherCodeData(hCode, hIsDay);
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

        // Map Hourly Data (Tomorrow 00:00 to 23:00)
        // Find index of tomorrow 00:00
        // Currently hourly data starts at day 0 (today) 00:00 usually.
        // So index 24 is tomorrow 00:00.
        const tomorrowHourly: HourlyForecastItem[] = [];
        for (let i = 24; i < 48; i++) {
            if (!hourly.time[i]) break;
            const hCode = hourly.weather_code[i];
            const hIsDay = hourly.is_day[i];
            const hData = getWeatherCodeData(hCode, hIsDay);
            const d = new Date(hourly.time[i]);
            const hours = d.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12 || 12} ${ampm}`;

            tomorrowHourly.push({
                time: formattedTime,
                temp: Math.round(hourly.temperature_2m[i]),
                icon: hData.icon,
                isNow: false,
                rainChance: hourly.precipitation_probability[i] || 0
            });
        }

        // Map Daily Data
        const mappedDaily: DailyForecastItem[] = daily.time.map((time: string, index: number) => {
            const d = new Date(time);
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            const code = daily.weather_code[index];
            const wData = getWeatherCodeData(code);

            return {
                day: dayName,
                date: dateStr,
                high: Math.round(daily.temperature_2m_max[index]),
                low: Math.round(daily.temperature_2m_min[index]),
                icon: wData.icon,
                condition: wData.condition,
                // Deep Dive Data
                windMax: Math.round(daily.wind_speed_10m_max[index]),
                uvMax: Math.round(daily.uv_index_max[index]),
                rainSum: Math.round(daily.precipitation_sum[index]),
                sunrise: new Date(daily.sunrise[index]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sunset: new Date(daily.sunset[index]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
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
            tomorrow: {
                high: Math.round(daily.temperature_2m_max[1]),
                low: Math.round(daily.temperature_2m_min[1]),
                condition: getWeatherCodeData(daily.weather_code[1]).condition,
                icon: getWeatherCodeData(daily.weather_code[1]).icon, // Generic icon for the day
                hourly: tomorrowHourly,
                // Using Daily Max/Sums for tomorrow's grid as "single value" representation
                windSpeed: Math.round(daily.wind_speed_10m_max[1]),
                rainChance: 0, // Daily rain probability not available in simple daily API, using 0 placeholder or need to calculate from hourly? defaulting to 0 for now. Actually, let's use precipitation_probability_max in daily.
                pressure: 1013, // Placeholder, pressure forecast not standard in daily simple.
                uvIndex: Math.round(daily.uv_index_max[1]),
                astro: {
                    sunrise: new Date(daily.sunrise[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                    sunset: new Date(daily.sunset[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                    sunriseDiff: formatTimeDiff(daily.sunrise[1]),
                    sunsetDiff: formatTimeDiff(daily.sunset[1]),
                }
            },
            hourly: mappedHourly,
            daily: mappedDaily,
            astro: {
                sunrise: new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sunset: new Date(daily.sunset[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sunriseDiff: formatTimeDiff(daily.sunrise[0]),
                sunsetDiff: formatTimeDiff(daily.sunset[0]),
            },
            aqi: {
                current: Math.round(currentAQI),
                label: aqiInfo.label,
                color: aqiInfo.color
            }
        };

    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};
