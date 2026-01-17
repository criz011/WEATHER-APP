import { View, Text } from 'react-native';

export default function DailyForecastList() {
  const forecast = [
    { date: 'Today', condition: 'Cloudy and Sunny', high: '3°', low: '-2°', icon: '⛅' },
    { date: 'Thursday, Jan 19', condition: 'Cloudy', high: '3°', low: '-3°', icon: '☁️' },
    { date: 'Thursday, Jan 20', condition: 'Cloudy', high: '3°', low: '-4°', icon: '☁️' },
    { date: 'Thursday, Jan 21', condition: 'Cloudy and Sunny', high: '3°', low: '-4°', icon: '⛅' },
    { date: 'Thursday, Jan 22', condition: 'Cloudy', high: '3°', low: '-3°', icon: '☁️' },
    { date: 'Thursday, Jan 23', condition: 'Cloudy and Sunny', high: '3°', low: '-4°', icon: '⛅' },
  ];

  return (
    <View className="px-6 mb-8">
      {forecast.map((day, index) => (
        <View 
          key={index} 
          className="bg-weather-card rounded-2xl p-4 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-1">
            <Text className="text-gray-900 font-medium mb-1">{day.date}</Text>
            <Text className="text-gray-600 text-sm">{day.condition}</Text>
          </View>
          
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-900 font-semibold">{day.high}</Text>
              <Text className="text-gray-500">{day.low}</Text>
            </View>
            <Text className="text-3xl">{day.icon}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
