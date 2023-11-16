import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pokeballs } from '../../data/constants';
import CloseDrawerButton from './CloseDrawerButton';

export default function CustomDrawer(props: any) {
  return (
    <SafeAreaView className="flex-1 px-3">
      <View className="h-[5%] w-full mt-4">
        <CloseDrawerButton />
      </View>
      <View className="h-1/5 w-full">
        <View className="h-3/4 aspect-square rounded-full border-2 mt">
          <Image
            source={require('../../../assets/images/profile/male_pic.png')}
            resizeMode="contain"
            className="h-full w-full rounded-full"
          />
        </View>
        <View className="w-full flex-row pt-2 mt-4 border-b-2">
          <View className="flex-1 items-start justify-end">
            <PrimaryText text={`₽ 500`} />
          </View>
          <View className="flex-1 flex-row justify-end">
            <View className="h-[32] w-[32]">
              <Image
                source={{ uri: pokeballs[0].sprite }}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="flex justify-end">
              <PrimaryText text={`12`} />
            </View>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="mb-4 h-8 justify-center">
        <PrimaryText text="Log out" classname="pt-[8]" />
      </View>
    </SafeAreaView>
  );
}
