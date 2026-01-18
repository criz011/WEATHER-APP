import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface Location {
    name: string;
    lat: number;
    lon: number;
}

interface LocationSelectorProps {
    onSelect: (location: Location) => void;
    onClose: () => void;
}

export const LOCATIONS: Location[] = [
    { name: 'Thrissur, India', lat: 10.5276, lon: 76.2144 },
    { name: 'Kochi, India', lat: 9.9312, lon: 76.2673 },
    { name: 'Delhi, India', lat: 28.6139, lon: 77.2090 },
];

export default function LocationSelector({ onSelect, onClose }: LocationSelectorProps) {
    return (
        <Pressable
            onPress={onClose}
            className="absolute inset-0 z-50 items-center pt-32"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
            {/* Search Container (Glass-like) */}
            <View
                className="w-[90%] bg-white/95 rounded-3xl p-4 shadow-xl"
                style={{
                    maxWidth: 400
                }}
                onStartShouldSetResponder={() => true} // Prevent closing when tapping the card itself
            >
                <Text className="text-gray-500 text-sm font-medium mb-4 ml-2" style={{ fontFamily: 'ProductSans-Regular' }}>
                    Select Location
                </Text>

                <View className="gap-2">
                    {LOCATIONS.map((loc) => (
                        <Pressable
                            key={loc.name}
                            onPress={() => onSelect(loc)}
                            className="flex-row items-center p-4 bg-gray-50 rounded-2xl active:bg-purple-50"
                        >
                            <View className="bg-white p-2 rounded-full mr-3 shadow-sm">
                                <MapPin size={20} color="#7C3AED" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
                                {loc.name}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </Pressable>
    );
}
