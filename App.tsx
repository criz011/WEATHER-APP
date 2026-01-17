import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

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
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Load Product Sans custom fonts
  const [fontsLoaded] = useFonts({
    'ProductSans-Regular': require('./assets/Product Sans Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading screen
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
            <RefreshControl refreshing={false} onRefresh={() => { }} tintColor="#8920D5" />
          }
        >
          {/* Sticky Hero Weather Card (includes Header + Hero + Tabs) */}
          <HeroWeatherCard
            scrollY={scrollY}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'today' || activeTab === 'tomorrow' ? (
            <>
              {/* Weather Details Grid */}
              <WeatherDetailsGrid />

              {/* Hourly Forecast */}
              <HourlyForecast />

              {/* Day Forecast Chart */}
              <DayForecastChart />

              {/* Rain Chance Chart */}
              <RainChanceChart />

              {/* Sunrise/Sunset */}
              <SunriseSunset />
            </>
          ) : (
            /* Daily Forecast List for 10 Days */
            <DailyForecastList />
          )}
        </Animated.ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
