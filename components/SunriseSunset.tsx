import { View, Text } from 'react-native';

export default function SunriseSunset() {
  return (
    <View className="px-6 mb-4">
      <View className="bg-weather-card rounded-2xl p-4">
        <View className="flex-row justify-between items-center">
          {/* Sunrise */}
          <View className="flex-1 items-center">
            <Text className="text-3xl mb-2">🌅</Text>
            <Text className="text-gray-700 text-sm mb-1">Sunrise</Text>
            <Text className="text-gray-900 font-semibold text-base">4:20 AM</Text>
            <Text className="text-gray-500 text-xs mt-1">48 ago</Text>
          </View>
          
          {/* Divider */}
          <View className="w-px h-16 bg-gray-300" />
          
          {/* Sunset */}
          <View className="flex-1 items-center">
            <Text className="text-3xl mb-2">🌇</Text>
            <Text className="text-gray-700 text-sm mb-1">Sunset</Text>
            <Text className="text-gray-900 font-semibold text-base">4:30 PM</Text>
            <Text className="text-gray-500 text-xs mt-1">In 7h</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
