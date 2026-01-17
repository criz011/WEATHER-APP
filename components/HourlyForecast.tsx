import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Clock } from 'lucide-react-native';
import { HourlyForecastItem } from '../services/weatherService';

const { width } = Dimensions.get('window');
// Calculate item width to show 5 items perfectly
// Screen Width - Outer Padding (24*2=48) - Inner Scroll Padding (16*2=32) - Gaps (10 * 4)
// We want exactly 5 items visible.
const CONTAINER_PADDING = 48; // px-6 * 2
const SCROLL_PADDING = 24; // px-3 * 2 (reduced slightly for better fit)
const GAP = 10;
const ITEM_WIDTH = (width - CONTAINER_PADDING - SCROLL_PADDING - (GAP * 4)) / 5;

interface HourlyForecastProps {
  hourly?: HourlyForecastItem[];
}

export default function HourlyForecast({ hourly = [] }: HourlyForecastProps) {
  return (
    <View className="px-6 mb-4">
      {/* Outer Container with slight glass/transparency feel via color */}
      <View className="bg-[#EFE9FF] rounded-3xl py-4">
        {/* Header */}
        <View className="flex-row items-center px-3 mb-3 gap-2.5">
          <View className="bg-white p-2 rounded-full items-center justify-center">
            <Clock size={18} color="#4B5563" />
          </View>
          <Text className="text-[16px] text-[#333333] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
            Hourly forecast
          </Text>
        </View>

        {/* Scrollable Horizontal List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: GAP }}
        >
          {hourly.map((item, index) => {
            const Icon = item.icon;
            return (
              <View
                key={index}
                style={{ width: ITEM_WIDTH }}
                className={`items-center justify-between py-3 rounded-2xl h-[110px] ${item.isNow ? 'bg-[#9333EA] border border-[#A855F7]' : 'bg-white/40 border border-white/20'}`}
              >
                <Text
                  className={`text-[13px] font-medium ${item.isNow ? 'text-white' : 'text-gray-600'}`}
                  style={{ fontFamily: 'ProductSans-Regular' }}
                >
                  {item.time}
                </Text>

                {Icon && <Icon width={32} height={32} />}

                <Text
                  className={`text-[15px] font-bold ${item.isNow ? 'text-white' : 'text-gray-800'}`}
                  style={{ fontFamily: 'ProductSans-Regular' }}
                >
                  {item.temp}°
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
