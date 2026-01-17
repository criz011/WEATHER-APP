import { View, Text as RNText } from 'react-native';
import { CloudRain } from 'lucide-react-native';

export interface RainChanceItem {
  time: string;
  percentage: number;
}

interface RainChanceChartProps {
  data?: RainChanceItem[];
}

export default function RainChanceChart({ data }: RainChanceChartProps) {
  const chartData = data || [
    { time: '7 PM', percentage: 27 },
    { time: '8 PM', percentage: 44 },
    { time: '9 PM', percentage: 56 },
    { time: '10 PM', percentage: 88 },
  ];

  return (
    <View className="px-6 mb-4">
      <View className="bg-[#EFE9FF] rounded-3xl py-4 pb-6">
        {/* Header - Matches DayForecastChart & HourlyForecast style */}
        <View className="flex-row items-center px-5 mb-5 gap-2.5">
          <View className="bg-white p-2 rounded-full items-center justify-center">
            <CloudRain size={18} color="#4B5563" />
          </View>
          <RNText
            className="text-[16px] text-[#333333] font-medium"
            style={{ fontFamily: 'ProductSans-Regular' }}
          >
            Chance of rain
          </RNText>
        </View>

        {/* Chart Rows */}
        <View className="px-5 gap-4">
          {chartData.map((item, index) => (
            <View key={index} className="flex-row items-center gap-4">
              {/* Time Label */}
              <RNText
                className="text-[15px] text-[#333333] w-12"
                style={{ fontFamily: 'ProductSans-Regular' }}
              >
                {item.time}
              </RNText>

              {/* Progress Bar Track */}
              <View className="flex-1 h-[28px] bg-white/60 rounded-full overflow-hidden flex-row">
                {/* Filled Portion */}
                <View
                  className="bg-[#8B5CF6] h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </View>

              {/* Percentage Label */}
              <RNText
                className="text-[15px] text-[#333333] font-bold w-10 text-right"
                style={{ fontFamily: 'ProductSans-Regular' }}
              >
                {item.percentage}%
              </RNText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
