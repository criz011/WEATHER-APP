import { View, Text, Pressable, ImageBackground, Dimensions } from 'react-native';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  SharedValue,
  interpolateColor
} from 'react-native-reanimated';

interface HeroWeatherCardProps {
  scrollY: SharedValue<number>;
  activeTab: 'today' | 'tomorrow' | '10days';
  onTabChange: (tab: 'today' | 'tomorrow' | '10days') => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCROLL_THRESHOLD = 120;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function HeroWeatherCard({ scrollY, activeTab, onTabChange }: HeroWeatherCardProps) {
  const insets = useSafeAreaInsets();

  // --- Animated Styles ---

  const containerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [380, 140 + insets.top],
      Extrapolation.CLAMP
    );

    const paddingTop = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [16 + insets.top, 16 + insets.top],
      Extrapolation.CLAMP
    );

    return {
      height,
      paddingTop,
    };
  });

  const wrapperStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['rgba(226, 211, 250, 0)', 'rgba(226, 211, 250, 1)']
    );
    return { backgroundColor };
  });

  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0],
      Extrapolation.CLAMP
    );

    // Parallax Effect: Move image up as header collapses
    // "Move along with the header"
    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [0, -50], // Move up by 50px (Adjustable for more/less movement)
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }]
    };
  });

  const gradientStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const locationStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)']
    );
    return { color };
  });

  const tempStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [120, 65 + insets.top],
      Extrapolation.CLAMP
    );

    const left = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [24, 24],
      Extrapolation.CLAMP
    );

    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [96, 64],
      Extrapolation.CLAMP
    );

    const color = interpolateColor(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['rgba(255, 255, 255, 1)', 'rgba(31, 41, 55, 1)']
    );

    return {
      top,
      left,
      fontSize,
      color,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [120, 65 + insets.top],
      Extrapolation.CLAMP
    );

    const left = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [SCREEN_WIDTH - 24 - 96 - 8, SCREEN_WIDTH - 24 - 64 - 8], // Adjusted for smaller icon
      Extrapolation.CLAMP
    );

    const size = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [96, 64],
      Extrapolation.CLAMP
    );

    return {
      top,
      left,
      width: size,
      height: size,
    };
  });

  // "Feels like" text style
  const feelsLikeStyle = useAnimatedStyle(() => {
    // Smoothly transition from Right of Big Temp (Expanded) to Right of Small Temp (Collapsed)

    // Horizontal Position (To the right of the temperature)
    // Expanded Temp (96px) width ~ 60-80px. Left=24. Start Text at ~100?
    // Collapsed Temp (64px) width ~ 40-50px. Left=24. Start Text at ~80?
    const left = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [110, 85],
      Extrapolation.CLAMP
    );

    // Vertical Position (Aligning baselines)
    // Expanded Top: 120 + (96 font - ~20 baseline offset) = ~196
    // Collapsed Top: (65 + insets.top) + (64 font - ~20 baseline offset)
    const top = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [196, 65 + insets.top + 38],
      Extrapolation.CLAMP
    );

    const color = interpolateColor(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 1)']
    );

    return {
      opacity: 1, // Always visible
      left,
      top,
      color,
    };
  });

  const contentOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD * 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <Animated.View style={wrapperStyle}>
      {/* Background Image Container */}
      <Animated.View
        className="rounded-b-[40px] overflow-hidden bg-[#E2D3FA]"
        style={[{ paddingHorizontal: 24 }, containerStyle]}
      >
        <Animated.Image
          source={require('../assets/hero image.jpg')}
          style={[{ position: 'absolute', width: '125%', height: 380 }, imageStyle]}
          resizeMode="cover"
        />

        {/* Top Fade Gradient */}
        <AnimatedLinearGradient
          colors={['#714CD2', 'transparent']}
          style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
            zIndex: 1,
          }, gradientStyle]}
        />

        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-2 z-10">
          <View className="flex-1">
            <Animated.Text
              style={[
                locationStyle,
                { fontSize: 20, fontWeight: '600', fontFamily: 'ProductSans-Regular' }
              ]}
            >
              Kharkiv, Ukraine
            </Animated.Text>
          </View>

          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
            <Search color="white" size={24} />
          </View>
        </View>

        {/* Floating Animated Elements (Absolute Positioned) */}
        <Animated.Text
          style={[
            {
              position: 'absolute',
              fontWeight: 'bold',
              fontFamily: 'ProductSans-Regular',
              zIndex: 20,
            },
            tempStyle
          ]}
        >
          3°
        </Animated.Text>

        <Animated.Text
          style={[
            {
              position: 'absolute',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: 'ProductSans-Regular',
              zIndex: 20,
            },
            feelsLikeStyle
          ]}
        >
          Feels like -2°
        </Animated.Text>

        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#FACC15', // yellow-400
              borderRadius: 9999,
              zIndex: 20,
            },
            iconStyle
          ]}
        />

        {/* Fading Content */}
        <Animated.View
          className="flex-1 justify-between pb-6 mt-20"
          style={contentOpacityStyle}
        >
          {/* Spacer */}
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              {/* Left: Metadata under Temp */}
              <View className="mt-16">
                {/* Removed duplicate feels like text */}
              </View>

              {/* Right: Metadata under Icon */}
              <View className="items-center mt-20 mr-4">
                <Text className="text-white text-3xl font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>Cloudy</Text>
              </View>
            </View>
          </View>

          {/* Bottom Row */}
          <View className="flex-row justify-between items-end">
            <Text className="text-white text-lg font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>January 18, 16:14</Text>

            <View className="items-end">
              <Text className="text-white text-lg font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>Day 3°</Text>
              <Text className="text-white text-lg font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>Night -1°</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Tab Navigation */}
      <View className="flex-row gap-3 px-6 py-4">
        <Pressable
          onPress={() => onTabChange('today')}
          className={`flex-1 items-center justify-center py-3 rounded-2xl ${activeTab === 'today' ? 'bg-weather-tab-active' : 'bg-white'}`}
        >
          <Text
            className={`font-medium ${activeTab === 'today' ? 'text-weather-accent' : 'text-slate-600'}`}
            style={{ fontFamily: 'ProductSans-Regular' }}
          >
            Today
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabChange('tomorrow')}
          className={`flex-1 items-center justify-center py-3 rounded-2xl ${activeTab === 'tomorrow' ? 'bg-weather-tab-active' : 'bg-white'}`}
        >
          <Text
            className={`font-medium ${activeTab === 'tomorrow' ? 'text-weather-accent' : 'text-slate-600'}`}
            style={{ fontFamily: 'ProductSans-Regular' }}
          >
            Tomorrow
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onTabChange('10days')}
          className={`flex-1 items-center justify-center py-3 rounded-2xl ${activeTab === '10days' ? 'bg-weather-tab-active' : 'bg-white'}`}
        >
          <Text
            className={`font-medium ${activeTab === '10days' ? 'text-weather-accent' : 'text-slate-600'}`}
            style={{ fontFamily: 'ProductSans-Regular' }}
          >
            10 days
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
