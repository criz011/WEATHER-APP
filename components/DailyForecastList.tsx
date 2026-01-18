import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, Wind, CloudRain, Sun, Sunrise, Sunset } from 'lucide-react-native';
import { DailyForecastItem } from '../services/weatherService';
import { useState } from 'react';

interface DailyForecastListProps {
  daily?: DailyForecastItem[];
}

export default function DailyForecastList({ daily = [] }: DailyForecastListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Limit to 10 days
  const limitedDaily = daily.slice(0, 10);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View className="px-6 mb-8">
      {limitedDaily.map((day, index) => {
        const Icon = day.icon;
        const isExpanded = expandedIndex === index;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => toggleExpand(index)}
            className={`bg-[#EFE9FF] rounded-3xl p-5 mb-3 transition-all ${isExpanded ? 'bg-[#E0D4FC]' : ''}`}
          >
            {/* Main Row */}
            <View className="flex-row items-center justify-between">
              {/* Left Side: Date & Condition */}
              <View>
                <Text className="text-[#1F2937] text-[17px] font-semibold mb-1" style={{ fontFamily: 'ProductSans-Regular' }}>
                  {index === 0 ? 'Today' : `${day.day}, ${day.date}`}
                </Text>
                <Text className="text-[#6B7280] text-[15px]" style={{ fontFamily: 'ProductSans-Regular' }}>
                  {day.condition}
                </Text>
              </View>

              {/* Right Side: Temps & Icon */}
              <View className="flex-row items-center gap-4">
                <View className="items-end gap-1">
                  <Text className="text-[#4C1D95] text-[17px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>{Math.round(day.high)}°</Text>
                  <Text className="text-[#6D28D9] text-[17px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>{Math.round(day.low)}°</Text>
                </View>

                {/* Divider */}
                <View className="w-[1.5px] h-10 bg-gray-400 mx-2" />

                {Icon && <Icon width={32} height={32} />}

                {isExpanded ? (
                  <ChevronUp size={20} color="#6B7280" />
                ) : (
                  <ChevronDown size={20} color="#6B7280" />
                )}
              </View>
            </View>

            {/* Expanded "Deep Dive" Details */}
            {isExpanded && (
              <View className="mt-4 pt-4 border-t border-white/50">
                <View className="flex-row flex-wrap justify-between gap-y-4">

                  {/* Wind */}
                  <View className="w-[48%] flex-row items-center gap-3">
                    <View className="bg-white p-2 rounded-full">
                      <Wind size={16} color="#4B5563" />
                    </View>
                    <View>
                      <Text className="text-[#6B7280] text-[12px]">Max Wind</Text>
                      <Text className="text-[#1F2937] text-[14px] font-semibold">{day.windMax} km/h</Text>
                    </View>
                  </View>

                  {/* Rain */}
                  <View className="w-[48%] flex-row items-center gap-3">
                    <View className="bg-white p-2 rounded-full">
                      <CloudRain size={16} color="#4B5563" />
                    </View>
                    <View>
                      <Text className="text-[#6B7280] text-[12px]">Rain</Text>
                      <Text className="text-[#1F2937] text-[14px] font-semibold">{day.rainSum} mm</Text>
                    </View>
                  </View>

                  {/* UV */}
                  <View className="w-[48%] flex-row items-center gap-3">
                    <View className="bg-white p-2 rounded-full">
                      <Sun size={16} color="#4B5563" />
                    </View>
                    <View>
                      <Text className="text-[#6B7280] text-[12px]">Max UV</Text>
                      <Text className="text-[#1F2937] text-[14px] font-semibold">{day.uvMax}</Text>
                    </View>
                  </View>

                  {/* Astro */}
                  <View className="w-[48%] flex-row items-center gap-3">
                    <View className="bg-white p-2 rounded-full">
                      <Sunrise size={16} color="#4B5563" />
                    </View>
                    <View>
                      <Text className="text-[#6B7280] text-[12px]">Sun</Text>
                      <Text className="text-[#1F2937] text-[14px] font-semibold">{day.sunrise}</Text>
                    </View>
                  </View>

                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
