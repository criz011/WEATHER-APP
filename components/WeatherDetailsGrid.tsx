import { View, Text } from 'react-native';
import { Wind, CloudRain, Waves, Sun } from 'lucide-react-native';

interface WeatherDetailsGridProps {
  windSpeed?: number;
  rainChance?: number;
  pressure?: number;
  uvIndex?: number;
  windSpeedDiff?: number;
  rainChanceDiff?: number;
  pressureDiff?: number;
  uvIndexDiff?: number;
}

export default function WeatherDetailsGrid({
  windSpeed = 0,
  rainChance = 0,
  pressure = 1000,
  uvIndex = 0,
  windSpeedDiff = 0,
  rainChanceDiff = 0,
  pressureDiff = 0,
  uvIndexDiff = 0
}: WeatherDetailsGridProps) {

  const renderTrend = (diff: number, unit: string = '') => {
    // Show "—" if 0
    if (diff === 0) {
      return (
        <View className="flex-row items-center">
          <Text className="text-[#9CA3AF] text-[10px] mr-1">—</Text>
          <Text className="text-[#6B7280] text-[11px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
            Stable
          </Text>
        </View>
      );
    }
    const isPositive = diff > 0;
    const trendColor = isPositive ? '#9333EA' : '#EF4444'; // Purple vs Faint Red

    return (
      <View className="flex-row items-center">
        <Text className="text-[10px] mr-1" style={{ color: trendColor }}>{isPositive ? '▲' : '▼'}</Text>
        <Text className="text-[#1F2937] text-[11px] font-bold" style={{ fontFamily: 'ProductSans-Regular' }}>
          {Math.abs(diff)} {unit}
        </Text>
      </View>
    );
  };

  return (
    <View className="px-6 mb-4">
      <View className="flex-row flex-wrap gap-3">
        {/* Wind Speed Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Wind size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Wind speed
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              {windSpeed}km/h
            </Text>
            {renderTrend(windSpeedDiff, 'km/h')}
          </View>
        </View>

        {/* Rain Chance Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <CloudRain size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Rain chance
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              {rainChance}%
            </Text>
            {renderTrend(rainChanceDiff, '%')}
          </View>
        </View>

        {/* Pressure Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Waves size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Pressure
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              {pressure} hpa
            </Text>
            {renderTrend(pressureDiff, 'hpa')}
          </View>
        </View>

        {/* UV Index Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Sun size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              UV Index
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              {uvIndex}
            </Text>
            {renderTrend(uvIndexDiff)}
          </View>
        </View>
      </View>
    </View>
  );
}
