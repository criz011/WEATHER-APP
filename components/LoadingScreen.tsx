import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
    Easing
} from 'react-native-reanimated';
import { CloudSun } from 'lucide-react-native';

interface LoadingScreenProps {
    message?: string;
}

export default function LoadingScreen({ message = 'Updating Forecast...' }: LoadingScreenProps) {
    // Animation Values
    const rotation = useSharedValue(0);
    const opacity = useSharedValue(0.5);
    const scale = useSharedValue(0.95);

    useEffect(() => {
        // Continuous Rotation for Sun
        rotation.value = withRepeat(
            withTiming(360, { duration: 4000, easing: Easing.linear }),
            -1,
            false
        );

        // Breathing Text Animation
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(0.5, { duration: 800 })
            ),
            -1,
            true
        );

        // Pulse Icon
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1500 }),
                withTiming(0.95, { duration: 1500 })
            ),
            -1,
            true
        );
    }, []);

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` },
                { scale: scale.value }
            ],
        };
    });

    const textStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View className="flex-1 bg-[#8920D5] items-center justify-center">

            {/* Animated Icon */}
            <View className="bg-white/20 p-8 rounded-full mb-8">
                <Animated.View style={iconStyle}>
                    <CloudSun size={64} color="white" />
                </Animated.View>
            </View>

            {/* Loading Text */}
            <Animated.Text
                className="text-white text-xl font-medium tracking-wide"
                style={[{ fontFamily: 'ProductSans-Regular' }, textStyle]}
            >
                {message}
            </Animated.Text>

        </View>
    );
}
