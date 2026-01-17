import { View, Text } from 'react-native';
import { Wind, CloudRain, Gauge, Sun, ChevronDown } from 'lucide-react-native';

export default function WeatherDetailsGrid() {
  return (
    <View className="px-6 mb-4">
      <View className="flex-row flex-wrap gap-3">
        {/* Wind Speed Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Wind size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Wind speed
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              12km/h
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#DC2626] text-[10px] mr-0.5">▼</Text>
              <Text className="text-[#1F2937] text-[11px] font-bold" style={{ fontFamily: 'ProductSans-Regular' }}>
                2 km/h
              </Text>
            </View>
          </View>
        </View>

        {/* Rain Chance Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <CloudRain size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Rain chance
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              24%
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#DC2626] text-[10px] mr-0.5">▼</Text>
              <Text className="text-[#1F2937] text-[11px] font-bold" style={{ fontFamily: 'ProductSans-Regular' }}>
                10%
              </Text>
            </View>
          </View>
        </View>

        {/* Pressure Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Gauge size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              Pressure
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              720 hpa
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#DC2626] text-[10px] mr-0.5">▼</Text>
              <Text className="text-[#1F2937] text-[11px] font-bold" style={{ fontFamily: 'ProductSans-Regular' }}>
                32 hpa
              </Text>
            </View>
          </View>
        </View>

        {/* UV Index Card */}
        <View className="bg-[#EFE9FF] rounded-3xl p-3 flex-1 min-w-[45%]">
          <View className="flex-row items-center gap-2.5 mb-1">
            <View className="bg-white p-2 rounded-full items-center justify-center">
              <Sun size={18} color="#4B5563" />
            </View>
            <Text className="text-[#333333] text-[15px] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              UV Index
            </Text>
          </View>
          <View className="flex-row items-baseline justify-between mt-2">
            <Text className="text-[#1F2937] text-[18px] font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>
              2,3
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#DC2626] text-[10px] mr-0.5">▼</Text>
              <Text className="text-[#1F2937] text-[11px] font-bold" style={{ fontFamily: 'ProductSans-Regular' }}>
                0.3
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
