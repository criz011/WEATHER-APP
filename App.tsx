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
          {(() => {
            const isTomorrow = activeTab === 'tomorrow';
            const heroData = isTomorrow ? weather?.tomorrow : weather?.current;
            // For tomorrow, use 'High' as the main display temp
            const displayTemp = isTomorrow ? heroData?.high : weather?.current.temp;

            // Format Tomorrow's Date
            const tomorrowDate = weather?.daily?.[1] ? `${weather.daily[1].day}, ${weather.daily[1].date}` : undefined;

            return (
              <HeroWeatherCard
                scrollY={scrollY}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                temp={displayTemp}
                condition={heroData?.condition}
                high={heroData?.high}
                low={heroData?.low}
                feelsLike={isTomorrow ? undefined : weather?.current.feelsLike}
                location="Thrissur, India"
                icon={heroData?.icon}
                date={isTomorrow ? tomorrowDate : undefined}
              />
            );
          })()}

          {activeTab === 'today' || activeTab === 'tomorrow' ? (
            (() => {
              // Helper to swap data based on tab
              const isTomorrow = activeTab === 'tomorrow';
              const currentData = isTomorrow ? weather?.tomorrow : weather?.current;
              const hourlyData = isTomorrow ? weather?.tomorrow.hourly : weather?.hourly;
              const astroData = isTomorrow ? weather?.tomorrow.astro : weather?.astro;

              return (
                <>
                  {/* Weather Details Grid */}
                  <WeatherDetailsGrid
                    windSpeed={currentData?.windSpeed}
                    rainChance={currentData?.rainChance}
                    pressure={currentData?.pressure}
                    uvIndex={currentData?.uvIndex}
                    // Hide diffs for tomorrow as they don't make sense relative to "yesterday" in this context
                    windSpeedDiff={isTomorrow ? undefined : weather?.current.windSpeedDiff}
                    rainChanceDiff={isTomorrow ? undefined : weather?.current.rainChanceDiff}
                    pressureDiff={isTomorrow ? undefined : weather?.current.pressureDiff}
                    uvIndexDiff={isTomorrow ? undefined : weather?.current.uvIndexDiff}
                  />

                  {/* Hourly Forecast */}
                  <HourlyForecast hourly={hourlyData} />

                  {/* Day Forecast Chart (Always 10 Days) */}
                  <DayForecastChart
                    daily={weather?.daily}
                    currentTemp={weather?.current.temp}
                  />

                  {/* Rain Chance Chart */}
                  <RainChanceChart hourly={hourlyData} />

                  {/* Sunrise/Sunset */}
                  <SunriseSunset
                    sunrise={astroData?.sunrise}
                    sunset={astroData?.sunset}
                    sunriseDiff={astroData?.sunriseDiff}
                    sunsetDiff={astroData?.sunsetDiff}
                  />
                </>
              );
            })()
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
