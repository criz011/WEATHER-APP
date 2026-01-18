import { View, Text, Pressable, ImageBackground, Dimensions } from 'react-native';
// Search import removed
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  SharedValue,
  interpolateColor
} from 'react-native-reanimated';
import { Cloud, Sun, LucideIcon } from 'lucide-react-native';
import { useState, useEffect } from 'react';

interface HeroWeatherCardProps {
  scrollY: SharedValue<number>;
  activeTab: 'today' | 'tomorrow' | '10days';
  onTabChange: (tab: 'today' | 'tomorrow' | '10days') => void;
  temp?: number;
  condition?: string;
  high?: number;
  low?: number;
  location?: string;
  feelsLike?: number;
  icon?: any;
  date?: string | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCROLL_THRESHOLD = 120;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function HeroWeatherCard({
  scrollY,
  activeTab,
  onTabChange,
  temp = 32,
  condition = 'Partly Cloudy',
  high = 34,
  low = 24,
  location = 'Thrissur, India',
  feelsLike = 35,
  icon: WeatherIcon = Sun, // Default to Sun if missing
  date = null
}: HeroWeatherCardProps) {
  const insets = useSafeAreaInsets();
  const [now, setNow] = useState(new Date());

  // Clock Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

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
    // Current approach: Animate TOP/LEFT and SCALE (instead of width/height) for better SVG handling
    const top = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [120, 55 + insets.top], // Raised by 10px from 65
      Extrapolation.CLAMP
    );

    const left = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [SCREEN_WIDTH - 24 - 96 - 8, SCREEN_WIDTH - 24 - 64 - 8], // Position
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0.67], // Scale from 100% (96px) to ~67% (64px)
      Extrapolation.CLAMP
    );

    return {
      top,
      left,
      transform: [{ scale }],
      // Remove explicit width/height here if using scale, OR keep them static 96
      width: 96,
      height: 96,
    };
  });

  // "Feels like" text style
  const feelsLikeStyle = useAnimatedStyle(() => {
    // Moved BELOW the temperature (Expanded) and Right (Collapsed)
    const left = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [28, 125], // Slide right to clear temp (~100px width)
      Extrapolation.CLAMP
    );

    const top = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [240, 65 + insets.top + 50], // Push down to align with Temp baseline (offset 50)
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

  const searchIconStyle = useAnimatedStyle(() => {
    const tintColor = interpolateColor(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)']
    );
    return { tintColor };
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
              numberOfLines={1}
            >
              {location}
            </Animated.Text>
          </View>

          <View className="w-10 h-10 rounded-full items-center justify-center">
            <Animated.Image
              source={require('../assets/search-icon.png')}
              style={[{ width: 18, height: 18 }, searchIconStyle]}
              resizeMode="contain"
            />
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
          {temp}°
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
          Feels like {feelsLike}°
        </Animated.Text>

        <Animated.View
          style={[
            {
              position: 'absolute',
              // Removed BG color/radius since we are rendering an icon
              zIndex: 20,
              alignItems: 'center',
              justifyContent: 'center',
            },
            iconStyle
          ]}
        >
          <WeatherIcon size={96} color="#FACC15" fill="#FACC15" />
        </Animated.View>

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
                <Text className="text-white text-3xl font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>{condition}</Text>
              </View>
            </View>
          </View>

          {/* Bottom Row */}
          <View className="flex-row justify-between items-end">
            <Text className="text-white text-lg font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
              {date ? date : `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
            </Text>

            <View className="items-end">
              <Text className="text-white text-lg font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>Day {high}°</Text>
              <Text className="text-white text-lg font-semibold" style={{ fontFamily: 'ProductSans-Regular' }}>Night {low}°</Text>
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
