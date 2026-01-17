import { View, Text, ScrollView } from 'react-native';
import { Sun, Cloud, CloudRain, Moon, Clock } from 'lucide-react-native';

export default function HourlyForecast() {
  const data = [
    { time: 'Now', temp: '10°', Icon: Sun },
    { time: '10am', temp: '8°', Icon: Cloud },
    { time: '11am', temp: '5°', Icon: CloudRain },
    { time: '12pm', temp: '12°', Icon: Sun },
    { time: '1pm', temp: '9°', Icon: Cloud },
    { time: '2pm', temp: '12°', Icon: Moon },
  ];

  return (
    <View className="px-6 mb-4">
      {/* Fixed Container */}
      <View className="bg-weather-card rounded-3xl py-4">
        {/* Heading inside container */}
        <View className="flex-row items-center px-4 mb-3 border-b border-gray-100/10 pb-2">
          <Clock size={16} color="#4B5563" />
          <Text className="text-sm text-gray-700 ml-2 font-medium">
             Hourly forecast
          </Text>
        </View>

        {/* Scrollable Content Inside */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {data.map(({ time, temp, Icon }, index) => (
            <View key={index} className="items-center px-2 min-w-[50px] gap-2">
              <Text className="text-gray-700 text-sm">{time}</Text>
              <Icon size={24} color="#4B5563" />
              <Text className="text-gray-900 font-semibold">{temp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
