import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { WeatherContext } from '../data/context/weatherContext';
import HomeHeader from '../components/HomePage/HomeHeader';
import WeatherView from '../components/HomePage/WeatherView';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const weatherContext = useContext(WeatherContext);

  const dayOfWeek = new Date()
    .toLocaleString('en-us', { weekday: 'long' })
    .split(',')[0];
  return (
    <SafeAreaView className="flex-1 mt-2 bg-white">
      <Header title="" openDrawer={navigation.openDrawer} />
      <View className="flex-1 m-4 items-center">
        <HomeHeader />
        <WeatherView
          temp={weatherContext.currentWeather.weather.tempC}
          city={weatherContext.currentWeather.location.name}
          day={dayOfWeek}
        />
      </View>
    </SafeAreaView>
  );
}
