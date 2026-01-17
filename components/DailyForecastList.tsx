import { View, Text } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { DailyForecastItem } from '../services/weatherService';

interface DailyForecastListProps {
  daily?: DailyForecastItem[];
}

export default function DailyForecastList({ daily = [] }: DailyForecastListProps) {
  // Limit to 10 days
  const limitedDaily = daily.slice(0, 10);

  return (
    <View className="px-6 mb-8">
      {limitedDaily.map((day, index) => {
        const Icon = day.icon;

        return (
          <View
            key={index}
            className="bg-[#EFE9FF] rounded-3xl p-5 mb-3 flex-row items-center justify-between"
            style={{ minHeight: 80 }}
          >
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

              {Icon && <Icon width={32} height={32} />}

              <ChevronDown size={20} color="#6B7280" />
            </View>
          </View>
        );
      })}
    </View>
  );
}
