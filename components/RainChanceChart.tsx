import { View, Text } from 'react-native';

export default function RainChanceChart() {
  const rainData = [
    { time: '7 PM', percentage: 27 },
    { time: '8 PM', percentage: 44 },
    { time: '9 PM', percentage: 56 },
    { time: '10 PM', percentage: 88 },
  ];

  return (
    <View className="px-6 mb-4">
      <Text className="text-sm text-gray-700 mb-3 flex-row items-center">
        ☔ Chance of rain
      </Text>
      <View className="bg-weather-card rounded-2xl p-4">
        {rainData.map((data, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <Text className="text-gray-700 text-sm w-16">{data.time}</Text>
            <View className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
              <View 
                className="bg-weather-accent h-full rounded-full items-end justify-center pr-2"
                style={{ width: `${data.percentage}%` }}
              >
                <Text className="text-white text-xs font-semibold">
                  {data.percentage}%
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
