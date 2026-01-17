import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { fetchWeatherData, WeatherData } from './services/weatherService';
import { ActivityIndicator, View } from 'react-native';

// Import weather components
import HeroWeatherCard from './components/HeroWeatherCard';
import HourlyForecast from './components/HourlyForecast';
import WeatherDetailsGrid from './components/WeatherDetailsGrid';
import DayForecastChart from './components/DayForecastChart';
import RainChanceChart from './components/RainChanceChart';
import SunriseSunset from './components/SunriseSunset';
import DailyForecastList from './components/DailyForecastList';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | '10days'>('today');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    const data = await fetchWeatherData();
    if (data) {
      setWeather(data);
    }
    setLoading(false);
  };

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Load Product Sans custom fonts
  const [fontsLoaded] = useFonts({
    'ProductSans-Regular': require('./assets/Product Sans Regular.ttf'),
  });

  if (!fontsLoaded || loading) {
    return (
      <View className="flex-1 items-center justify-center bg-purple-400">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-purple-400" edges={['left', 'right']}>
        <Animated.ScrollView
          className="flex-1 bg-weather-bg"
          onScroll={onScroll}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadWeather} tintColor="#8920D5" />
          }
        >
          {/* Sticky Hero Weather Card (includes Header + Hero + Tabs) */}
          <HeroWeatherCard
            scrollY={scrollY}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            temp={weather?.current.temp}
            condition={weather?.current.condition}
            high={weather?.current.high}
            low={weather?.current.low}
            feelsLike={weather?.current.feelsLike}
            location="Thrissur, India"
            icon={weather?.current.icon}
          />

          {activeTab === 'today' || activeTab === 'tomorrow' ? (
            <>
              {/* Weather Details Grid */}
              <WeatherDetailsGrid
                windSpeed={weather?.current.windSpeed}
                rainChance={weather?.current.rainChance}
                pressure={weather?.current.pressure}
                uvIndex={weather?.current.uvIndex}
                windSpeedDiff={weather?.current.windSpeedDiff}
                rainChanceDiff={weather?.current.rainChanceDiff}
                pressureDiff={weather?.current.pressureDiff}
                uvIndexDiff={weather?.current.uvIndexDiff}
              />

              {/* Hourly Forecast */}
              <HourlyForecast hourly={weather?.hourly} />

              {/* Day Forecast Chart */}
              <DayForecastChart
                daily={weather?.daily}
                currentTemp={weather?.current.temp}
              />

              {/* Rain Chance Chart */}
              <RainChanceChart hourly={weather?.hourly} />

              {/* Sunrise/Sunset */}
              <SunriseSunset
                sunrise={weather?.astro.sunrise}
                sunset={weather?.astro.sunset}
                sunriseDiff={weather?.astro.sunriseDiff}
                sunsetDiff={weather?.astro.sunsetDiff}
              />
            </>
          ) : (
            /* Daily Forecast List for 10 Days */
            <DailyForecastList daily={weather?.daily} />
          )}
        </Animated.ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
