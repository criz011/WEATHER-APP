import { View, Text } from 'react-native';
import { Sunrise, Sunset } from 'lucide-react-native';

interface SunriseSunsetProps {
  sunrise?: string;
  sunset?: string;
  sunriseDiff?: string;
  sunsetDiff?: string;
}

export default function SunriseSunset({
  sunrise = '4:20 AM',
  sunset = '4:50 PM',
  sunriseDiff = '4h ago',
  sunsetDiff = 'in 9h',
}: SunriseSunsetProps) {
  return (
    <View className="px-6 mb-2">
      <View className="flex-row gap-4">

        {/* Sunrise */}
        <View className="flex-1 basis-0 bg-[#EFE9FF] rounded-3xl px-4 py-4 h-[84px] justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-white p-2 rounded-full">
              <Sunrise size={18} color="#4B5563" />
            </View>
            <Text
              className="text-[14px] text-gray-700 font-medium"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              Sunrise
            </Text>
          </View>

          <View className="flex-row items-end justify-between">
            <Text
              className="text-[17px] text-[#333333] font-semibold"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              {sunrise}
            </Text>

            <Text
              className="text-[11px] text-gray-500 font-medium mb-0.5"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              {sunriseDiff}
            </Text>
          </View>
        </View>

        {/* Sunset */}
        <View className="flex-1 basis-0 bg-[#EFE9FF] rounded-3xl px-4 py-4 h-[84px] justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-white p-2 rounded-full">
              <Sunset size={18} color="#4B5563" />
            </View>
            <Text
              className="text-[14px] text-gray-700 font-medium"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              Sunset
            </Text>
          </View>

          <View className="flex-row items-end justify-between">
            <Text
              className="text-[17px] text-[#333333] font-semibold"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              {sunset}
            </Text>

            <Text
              className="text-[11px] text-gray-500 font-medium mb-0.5"
              style={{ fontFamily: 'ProductSans-Regular' }}
            >
              {sunsetDiff}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
}
