import { View, Text } from 'react-native';
import { Wind, CloudRain, Gauge, Sun } from 'lucide-react-native';

export default function WeatherDetailsGrid() {
  const details = [
    { Icon: Wind, label: 'Wind speed', value: '12km/h', change: '2 km/h' },
    { Icon: CloudRain, label: 'Rain chance', value: '24%', change: '10%' },
    { Icon: Gauge, label: 'Pressure', value: '720 hpa', change: '32 hpa' },
    { Icon: Sun, label: 'UV index', value: '2.3', change: '0.3' },
  ];

  return (
    <View className="px-6 mb-4">
      <View className="flex-row flex-wrap gap-3">
        {details.map(({ Icon, label, value, change }, index) => (
          <View 
            key={index} 
            className="bg-weather-card rounded-2xl p-4 flex-1 min-w-[45%] flex-row items-center"
          >
            <View className="bg-white/50 p-3 rounded-full mr-3">
              <Icon size={24} color="#4B5563" />
            </View>
            <View>
              <Text className="text-gray-700 text-sm mb-1">{label}</Text>
              <Text className="text-gray-900 text-xl font-semibold mb-1">
                {value}
              </Text>
              <Text className="text-gray-600 text-xs">{change}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
