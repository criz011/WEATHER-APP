import { View, Text as RNText, Dimensions } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Line as SvgLine,
  Text as SvgText,
  G
} from 'react-native-svg';

const { width } = Dimensions.get('window');

interface DayForecastChartProps {
  data?: number[];
  activeDayIndex?: number;
}

export default function DayForecastChart({
  data = [-6, -1, -2, 3, -1, -4, 0],
  activeDayIndex = 3
}: DayForecastChartProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Layout (Adjusted)
  const CONTAINER_PADDING = 48;
  const CARD_PADDING = 40;
  const CHART_HEIGHT = 130; // ⬇ reduced

  const CONTENT_WIDTH = width - CONTAINER_PADDING - CARD_PADDING;

  const MARGIN_LEFT = 55;
  const MARGIN_RIGHT = 10;
  const MARGIN_BOTTOM = 20;
  const MARGIN_TOP = 18; // ⬇ pushes graph down

  const GRAPH_WIDTH = CONTENT_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const GRAPH_HEIGHT = CHART_HEIGHT - MARGIN_BOTTOM - MARGIN_TOP;

  // -----------------------
  // Dynamic Y Axis (3 labels)
  // -----------------------
  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);

  const MIN_TEMP = Math.floor(dataMin / 5) * 5 - 5;
  const MAX_TEMP = Math.ceil(dataMax / 5) * 5 + 5;
  const RANGE = MAX_TEMP - MIN_TEMP;

  const midTemp = Math.round(((MIN_TEMP + MAX_TEMP) / 2) / 5) * 5;
  const yAxisValues = [MAX_TEMP, midTemp, MIN_TEMP];

  const getY = (temp: number) =>
    MARGIN_TOP +
    GRAPH_HEIGHT -
    ((temp - MIN_TEMP) / RANGE) * GRAPH_HEIGHT;

  const getX = (index: number) =>
    MARGIN_LEFT + (index / (days.length - 1)) * GRAPH_WIDTH;

  // Smooth curve
  const generatePath = (points: number[]) => {
    let d = `M ${getX(0)} ${getY(points[0])}`;

    for (let i = 0; i < points.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(points[i]);
      const x2 = getX(i + 1);
      const y2 = getY(points[i + 1]);
      const cx = x1 + (x2 - x1) / 2;

      d += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
    }
    return d;
  };

  const pathD = generatePath(data);
  const fillPathD = `${pathD} L ${MARGIN_LEFT + GRAPH_WIDTH} ${MARGIN_TOP + GRAPH_HEIGHT} L ${MARGIN_LEFT} ${MARGIN_TOP + GRAPH_HEIGHT} Z`;

  const activeX = getX(activeDayIndex);
  const activeY = getY(data[activeDayIndex]);
  const activeTemp = data[activeDayIndex];

  return (
    <View className="px-6 mb-4">
      <View className="bg-[#EFE9FF] rounded-3xl py-4">

        {/* Header */}
        <View className="flex-row items-center px-5 mb-1 gap-2.5">
          <View className="bg-white p-2 rounded-full">
            <Calendar size={18} color="#4B5563" />
          </View>
          <RNText
            className="text-[16px] text-[#333333] font-medium"
            style={{ fontFamily: 'ProductSans-Regular' }}
          >
            Day forecast
          </RNText>
        </View>

        {/* Chart */}
        <View className="px-5">
          <View style={{ height: CHART_HEIGHT + 16 }}>
            <Svg height={CHART_HEIGHT} width={CONTENT_WIDTH}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#A855F7" stopOpacity="0.3" />
                  <Stop offset="1" stopColor="#A855F7" stopOpacity="0" />
                </LinearGradient>
              </Defs>

              {/* Y Axis */}
              {yAxisValues.map((t) => {
                const yPos = getY(t);
                return (
                  <G key={t}>
                    <SvgText
                      x={17}
                      y={yPos + 4}
                      fontSize={12}
                      fontWeight="600"
                      fill="#4B5563"
                      textAnchor="middle"
                      fontFamily="System"
                    >
                      {`${t}°`}
                    </SvgText>

                    <SvgLine
                      x1={MARGIN_LEFT}
                      y1={yPos}
                      x2={MARGIN_LEFT + GRAPH_WIDTH}
                      y2={yPos}
                      stroke="rgba(209,213,219,0.5)"
                      strokeWidth="1"
                    />
                  </G>
                );
              })}

              {/* Active dashed line */}
              <SvgLine
                x1={activeX}
                y1={activeY}
                x2={activeX}
                y2={MARGIN_TOP + GRAPH_HEIGHT}
                stroke="#4C1D95"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Fill */}
              <Path d={fillPathD} fill="url(#grad)" />

              {/* Curve */}
              <Path d={pathD} stroke="#1F2937" strokeWidth="2.5" fill="none" />

              {/* Active dot */}
              <Circle
                cx={activeX}
                cy={activeY}
                r={5}
                fill="#4C1D95"
                stroke="white"
                strokeWidth={2.5}
              />

              {/* X Axis */}
              {days.map((day, i) => (
                <SvgText
                  key={i}
                  x={getX(i)}
                  y={CHART_HEIGHT - 4}
                  fontSize={12}
                  fill="#4B5563"
                  textAnchor="middle"
                  fontWeight={i === activeDayIndex ? 'bold' : 'normal'}
                  fontFamily="ProductSans-Regular"
                >
                  {day}
                </SvgText>
              ))}
            </Svg>

            {/* Tooltip */}
            <View
              className="absolute"
              style={{
                left: activeX - 18,
                top: activeY - 32, // ⬆ adjusted
              }}
            >
              <View className="bg-white rounded-full px-3 py-1">
                <RNText className="text-gray-900 font-bold text-sm">
                  {activeTemp}°
                </RNText>
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
}
