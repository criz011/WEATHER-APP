import { View, Text } from 'react-native';
import { Calendar } from 'lucide-react-native';

export default function DayForecastChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View className="px-6 mb-4">
      <View className="bg-weather-card rounded-3xl pt-4 pb-4">
        {/* Heading inside container */}
        <View className="flex-row items-center px-4 mb-3 border-b border-gray-100/10 pb-2">
          <Calendar size={16} color="#4B5563" />
          <Text className="text-sm text-gray-700 ml-2 font-medium">
             Day forecast
          </Text>
        </View>

        {/* Chart Content */}
        <View className="px-4">
          {/* Temperature range labels */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600 text-xs">10°</Text>
            <Text className="text-gray-600 text-xs">3°</Text>
            <Text className="text-gray-600 text-xs">0°</Text>
            <Text className="text-gray-600 text-xs">-10°</Text>
          </View>
          
          {/* Chart placeholder - wavy line */}
          <View className="h-24 bg-purple-50 rounded-lg mb-3 items-center justify-center">
            <Text className="text-purple-300">📈 Temperature Chart</Text>
          </View>
          
          {/* Day labels */}
          <View className="flex-row justify-between">
            {days.map((day, index) => (
              <Text key={index} className="text-gray-600 text-xs">{day}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
