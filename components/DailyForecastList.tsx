import { View, Text } from 'react-native';
import { Sun, Cloud, CloudSun, ChevronDown } from 'lucide-react-native';

export default function DailyForecastList() {
  const forecast = [
    { date: 'Today', condition: 'Cloudy and Sunny', high: '3°', low: '-2°', Icon: CloudSun, iconColor: '#FBBF24' },
    { date: 'Thursday, Jan 19', condition: 'Cloudy', high: '3°', low: '-2°', Icon: Cloud, iconColor: '#9CA3AF' },
    { date: 'Thursday, Jan 20', condition: 'Cloudy', high: '3°', low: '-2°', Icon: Cloud, iconColor: '#9CA3AF' },
    { date: 'Thursday, Jan 21', condition: 'Cloudy and Sunny', high: '3°', low: '-2°', Icon: CloudSun, iconColor: '#FBBF24' },
    { date: 'Thursday, Jan 22', condition: 'Cloudy', high: '3°', low: '-2°', Icon: Cloud, iconColor: '#9CA3AF' },
    { date: 'Thursday, Jan 23', condition: 'Cloudy and Sunny', high: '3°', low: '-2°', Icon: CloudSun, iconColor: '#FBBF24' },
    { date: 'Thursday, Jan 23', condition: 'Cloudy', high: '3°', low: '-2°', Icon: Cloud, iconColor: '#9CA3AF' }, // Intentionally keeping requested mock data pattern
    { date: 'Friday, Jan 24', condition: 'Sunny', high: '4°', low: '-1°', Icon: Sun, iconColor: '#F59E0B' },
    { date: 'Saturday, Jan 25', condition: 'Cloudy', high: '2°', low: '-3°', Icon: Cloud, iconColor: '#9CA3AF' },
    { date: 'Sunday, Jan 26', condition: 'Snow', high: '0°', low: '-5°', Icon: Cloud, iconColor: '#9CA3AF' },
  ];

  return (
    <View className="px-6 mb-8">
      {forecast.map((day, index) => (
        <View
          key={index}
          className="bg-[#EFE9FF] rounded-3xl p-5 mb-3 flex-row items-center justify-between"
          style={{ minHeight: 80 }}
        >
          {/* Left Side: Date & Condition */}
          <View>
            <Text className="text-[#1F2937] text-[17px] font-semibold mb-1" style={{ fontFamily: 'ProductSans-Regular' }}>{day.date}</Text>
            <Text className="text-[#6B7280] text-[15px]" style={{ fontFamily: 'ProductSans-Regular' }}>{day.condition}</Text>
          </View>

          {/* Right Side: Temps & Icon */}
          <View className="flex-row items-center gap-4">
            <View className="items-end gap-1">
              <Text className="text-[#4C1D95] text-[17px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>{day.high}</Text>
              <Text className="text-[#6D28D9] text-[17px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>{day.low}</Text>
            </View>

            <day.Icon size={32} color={day.iconColor} fill={day.iconColor === '#FBBF24' || day.iconColor === '#F59E0B' ? day.iconColor : 'transparent'} />

            <ChevronDown size={20} color="#6B7280" />
          </View>
        </View>
      ))}
    </View>
  );
}
