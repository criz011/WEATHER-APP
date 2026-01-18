import { View, Text } from 'react-native';
import { Leaf } from 'lucide-react-native';

interface AirQualityProps {
    aqi?: number;
    label?: string;
    color?: string;
}

export default function AirQuality({
    aqi = 45,
    color = '#10B981'
}: AirQualityProps) {

    return (
        <View className="px-6 mb-2">
            <View className="bg-[#EFE9FF] rounded-3xl p-5 flex-row items-center justify-between">

                {/* Left: Icon + Title */}
                <View className="flex-row items-center gap-3">
                    <View className="bg-white p-2 rounded-full">
                        <Leaf size={18} color="#4B5563" />
                    </View>
                    <Text className="text-[15px] text-gray-700 font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
                        Air Quality
                    </Text>
                </View>

                {/* Right: Value */}
                <Text className="text-[24px] font-bold" style={{ fontFamily: 'ProductSans-Regular', color: color }}>
                    {aqi}
                </Text>

            </View>
        </View>
    );
}
