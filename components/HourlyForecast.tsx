import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Sun, Cloud, CloudRain, Moon, Clock, CloudSun } from 'lucide-react-native';

const { width } = Dimensions.get('window');
// Calculate item width to show 5 items perfectly
// Screen Width - Outer Padding (24*2=48) - Inner Scroll Padding (16*2=32) - Gaps (10 * 4)
// We want exactly 5 items visible.
const CONTAINER_PADDING = 48; // px-6 * 2
const SCROLL_PADDING = 24; // px-3 * 2 (reduced slightly for better fit)
const GAP = 10;
const ITEM_WIDTH = (width - CONTAINER_PADDING - SCROLL_PADDING - (GAP * 4)) / 5;

export default function HourlyForecast() {
  // Generate 24 hours of mock data
  const data = [
    { time: 'Now', temp: '10°', Icon: Sun, isActive: true },
    { time: '10 AM', temp: '8°', Icon: CloudSun, isActive: false },
    { time: '11 AM', temp: '5°', Icon: CloudRain, isActive: false },
    { time: '12 PM', temp: '12°', Icon: Sun, isActive: false },
    { time: '1 PM', temp: '9°', Icon: Cloud, isActive: false },
    { time: '2 PM', temp: '13°', Icon: CloudSun, isActive: false },
    { time: '3 PM', temp: '14°', Icon: Sun, isActive: false },
    { time: '4 PM', temp: '12°', Icon: CloudSun, isActive: false },
    { time: '5 PM', temp: '10°', Icon: Cloud, isActive: false },
    { time: '6 PM', temp: '8°', Icon: Moon, isActive: false },
    { time: '7 PM', temp: '7°', Icon: Moon, isActive: false },
    { time: '8 PM', temp: '6°', Icon: Moon, isActive: false },
    { time: '9 PM', temp: '5°', Icon: Moon, isActive: false },
    { time: '10 PM', temp: '4°', Icon: Cloud, isActive: false },
    { time: '11 PM', temp: '4°', Icon: Cloud, isActive: false },
    { time: '12 AM', temp: '3°', Icon: Cloud, isActive: false },
    { time: '1 AM', temp: '3°', Icon: Cloud, isActive: false },
    { time: '2 AM', temp: '2°', Icon: Cloud, isActive: false },
    { time: '3 AM', temp: '2°', Icon: Cloud, isActive: false },
    { time: '4 AM', temp: '2°', Icon: Cloud, isActive: false },
    { time: '5 AM', temp: '3°', Icon: Cloud, isActive: false },
    { time: '6 AM', temp: '4°', Icon: Sun, isActive: false },
    { time: '7 AM', temp: '6°', Icon: Sun, isActive: false },
    { time: '8 AM', temp: '8°', Icon: Sun, isActive: false },
  ];

  return (
    <View className="px-6 mb-4">
      {/* Outer Container with slight glass/transparency feel via color */}
      <View className="bg-[#EFE9FF] rounded-3xl py-4">
        {/* Header */}
        <View className="flex-row items-center px-5 mb-3 gap-2.5">
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
          {data.map(({ time, temp, Icon, isActive }, index) => (
            <View
              key={index}
              style={{ width: ITEM_WIDTH }}
              className={`items-center justify-between py-3 rounded-2xl h-[110px] ${isActive ? 'bg-[#9333EA] border border-[#A855F7]' : 'bg-white/40 border border-white/20'}`}
            >
              <Text
                className={`text-[13px] font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}
                style={{ fontFamily: 'ProductSans-Regular' }}
              >
                {time}
              </Text>

              <Icon size={24} color={isActive ? '#FFFFFF' : '#4B5563'} />

              <Text
                className={`text-[15px] font-bold ${isActive ? 'text-white' : 'text-gray-800'}`}
                style={{ fontFamily: 'ProductSans-Regular' }}
              >
                {temp}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
