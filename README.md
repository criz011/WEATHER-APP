# 🌦️ Modern Weather App

A stunning, highly interactive weather application built with **React Native** and **Expo**. Designed with a focus on fluid animations, detailed visualizations, and a modern "Glassmorphism" aesthetic.

## ✨ Features

- **📍 Location Search**: Seamlessly switch between cities (Thrissur, Kochi, Delhi) with a custom frosted-glass search overlay.
- **📈 Interactive Charts**: 
  - Custom SVG Bezier curves for 10-day temperature trends.
  - Bar charts for rain probability.
- **🍃 Air Quality Index (AQI)**: Real-time AQI monitoring with color-coded health indicators and eco-friendly visuals.
- **☔ Detailed Metrics**: 
  - Real-time Wind, UV Index, Pressure, and Precipitation stats.
  - "Feels Like" temperature with dynamic color interpolation.
- **🌗 Astro Details**: Beautiful sunrise/sunset cards with relative time calculations.
- **📅 3-Tab Layout**: 
  - **Today**: Complete dashboard.
  - **Tomorrow**: Hourly & detailed forecast.
  - **10 Days**: Long-term outlook list.
- **🎨 Animations**: Powered by `react-native-reanimated` for smooth scroll effects, header transitions, and loading states.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (TailwindCSS for Native)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **Charts**: [React Native SVG](https://github.com/software-mansion/react-native-svg)
- **Data Source**: [Open-Meteo API](https://open-meteo.com/) (Weather & Air Quality)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the app**
    ```bash
    npx expo start
    ```
    - Scan the QR code with **Expo Go** (Android/iOS) or run on a Simulator.

## 📂 Project Structure

```
c:/Coding/WEATHER-APP/
├── components/          # Reusable UI Components
│   ├── HeroWeatherCard.tsx  # Main header card with animations
│   ├── DayForecastChart.tsx # SVG Temperature Graph
│   ├── AirQuality.tsx       # AQI Indicator
│   └── ...
├── services/            # API Logic
│   └── weatherService.ts    # Open-Meteo fetch & data mapping
├── assets/              # Fonts, Icons, Images
├── App.tsx              # Main entry point & State Management
└── tailwind.config.js   # NativeWind Configuration
```

## 🌍 API Reference

This project uses the **Open-Meteo Free API** (No key required).
- Forecast Endpoint: `https://api.open-meteo.com/v1/forecast`
- Air Quality Endpoint: `https://air-quality-api.open-meteo.com/v1/air-quality`

## 🔮 Future Improvements

- [ ] Interactive Map View
- [ ] Push Notifications for Severe Weather
- [ ] Dark/Light Mode toggle

---

Made with ❤️ using React Native.
