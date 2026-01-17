import { View, Text, Dimensions } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line as SvgLine, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function DayForecastChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Mock data to match the curve shape in reference: roughly [-6, -1, -2, 3, -1, -3, 0]
  const data = [-6, -1, -2, 3, -1, -4, 0];

  // Dimensions
  const CHART_HEIGHT = 100;
  const PADDING_HORIZONTAL = 16;
  const CHART_WIDTH = width - 48 - (PADDING_HORIZONTAL * 2); // Container width - padding

  // Scales
  const MAX_TEMP = 10;
  const MIN_TEMP = -10;
  const RANGE = MAX_TEMP - MIN_TEMP;

  const getY = (temp: number) => {
    return CHART_HEIGHT - ((temp - MIN_TEMP) / RANGE) * CHART_HEIGHT;
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * CHART_WIDTH;
  };

  // Generate smooth path (simple Catmull-Rom to Bezier conversion or similar smoothing)
  // For simplicity and specific shape, I'll construct a cubic bezier path or simply line to line with smoothing
  // Here, implementing a basic smoothing:
  const generatePath = (points: number[]) => {
    let d = `M ${getX(0)} ${getY(points[0])}`;

    for (let i = 0; i < points.length - 1; i++) {
      const x_start = getX(i);
      const y_start = getY(points[i]);
      const x_end = getX(i + 1);
      const y_end = getY(points[i + 1]);

      // Control points for smooth curve (midpoint x, current y)
      const cp1x = x_start + (x_end - x_start) / 2;
      const cp1y = y_start;
      const cp2x = x_start + (x_end - x_start) / 2;
      const cp2y = y_end;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x_end} ${y_end}`;
    }
    return d;
  };

  const pathD = generatePath(data);
  const fillPathD = `${pathD} L ${CHART_WIDTH} ${CHART_HEIGHT + 20} L 0 ${CHART_HEIGHT + 20} Z`;

  // Active Item (Thursday - Index 3)
  const activeIndex = 3;
  const activeX = getX(activeIndex);
  const activeY = getY(data[activeIndex]);

  return (
    <View className="px-6 mb-4">
      <View className="bg-[#EFE9FF] rounded-3xl py-4">
        {/* Header */}
        <View className="flex-row items-center px-5 mb-3 gap-2.5">
          <View className="bg-white p-2 rounded-full items-center justify-center">
            <Calendar size={18} color="#4B5563" />
          </View>
          <Text className="text-[16px] text-[#333333] font-medium" style={{ fontFamily: 'ProductSans-Regular' }}>
            Day forecast
          </Text>
        </View>

        {/* Chart Content */}
        <View className="px-5">
          <View style={{ height: 160, justifyContent: 'center' }}>

            {/* Y-Axis Labels (Absolute positioning for layout simplicity or Grid) */}
            <View className="absolute left-0 top-0 bottom-8 justify-between z-10 w-full" pointerEvents="none">
              <View className="flex-row items-center w-full">
                <Text className="text-gray-500 text-xs w-8 text-right pr-2">10°</Text>
                <View className="flex-1 h-[1px] bg-gray-300/30" />
              </View>
              <View className="flex-row items-center w-full">
                <Text className="text-gray-500 text-xs w-8 text-right pr-2">0°</Text>
                <View className="flex-1 h-[1px] bg-gray-300/30" />
              </View>
              <View className="flex-row items-center w-full">
                <Text className="text-gray-500 text-xs w-8 text-right pr-2">-10°</Text>
                <View className="flex-1 h-[1px] bg-gray-300/30" />
              </View>
            </View>

            {/* Chart SVG */}
            <View className="ml-8 mt-2 mb-2" style={{ height: CHART_HEIGHT, width: CHART_WIDTH }}>
              <Svg height={CHART_HEIGHT + 30} width={CHART_WIDTH} overflow="visible">
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#A855F7" stopOpacity="0.3" />
                    <Stop offset="1" stopColor="#A855F7" stopOpacity="0" />
                  </LinearGradient>
                </Defs>

                {/* Active Line (Dashed) */}
                <SvgLine
                  x1={activeX}
                  y1={activeY}
                  x2={activeX}
                  y2={CHART_HEIGHT + 20}
                  stroke="#4C1D95"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Gradient Fill */}
                <Path d={fillPathD} fill="url(#grad)" />

                {/* The Curve */}
                <Path d={pathD} stroke="#1F2937" strokeWidth="2.5" fill="none" />

                {/* Active Point */}
                <Circle cx={activeX} cy={activeY} r="5" fill="#4C1D95" stroke="white" strokeWidth="2.5" />
              </Svg>
            </View>

            {/* Tooltip (Absolute on top of active point) */}
            <View
              className="absolute shadow-sm"
              style={{
                left: activeX + 32 - 18, // 32 is left margin offset
                top: activeY - 26,
              }}
            >
              <View className="bg-white rounded-full px-3 py-1 items-center justify-center">
                <Text className="text-gray-900 font-bold text-sm">3°</Text>
              </View>
            </View>
          </View>

          {/* X-Axis Labels */}
          <View className="flex-row justify-between ml-8 mt-1">
            {days.map((day, index) => (
              <Text key={index} className="text-gray-800 text-[13px] text-center" style={{ width: 28, fontFamily: 'ProductSans-Regular' }}>
                {day}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
