import React, { useContext, useState } from 'react';
import { Image, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import Custom8BitRoundedBorders from '../Custom/Custom8BitRoundedBorders';
import PrimaryText from '../Custom/PrimaryText';
import { addCaughtPokemon, addSeenPokemon } from '../../firebase/firebaseStore';
import { UserContext } from '../../data/context/userContext';
import { PokemonInterface } from '../../interfaces/Pokemon';

type Props = {
  pokemon: PokemonInterface;
  gotPokemon: boolean;
  usedPokeball: string;
  size: number;
  bg: string;
};
export default function TryingToCatchPokemon(props: Props) {
  const user = useContext(UserContext);

  const pokeballRotation = useSharedValue(1);
  const pokeballGotchaAnimation = useSharedValue(0);
  const [gotchaMessage, setGotchaMessage] = useState<string>('null');
  const [gotcha, setGotcha] = useState<boolean | null>(null);

  const updateUser = async (pokemonId: number) => {
    if (props.gotPokemon) await addCaughtPokemon(user.user, pokemonId);
    await addSeenPokemon(user.user, pokemonId);
  };

  const showGotcha = () => {
    setTimeout(
      async () => {
        setGotchaMessage(
          props.gotPokemon
            ? 'GOTCHA!!!\nYou won ₽ 100.'
            : `${props.pokemon.name} got away!`,
        );
        setGotcha(props.gotPokemon);
        await updateUser(props.pokemon.id);
        await user.getData(user.user.id);
      },
      props.gotPokemon ? 0 : 500,
    );
  };

  const animatedPokeball = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: pokeballRotation.value * 30 + 'deg' },
        { translateY: pokeballGotchaAnimation.value },
      ],
    };
  });

  React.useEffect(() => {
    pokeballRotation.value = withRepeat(
      withSpring(-pokeballRotation.value, { duration: 1000 }),
      3,
      true,
      (finished) => {
        if (finished) {
          pokeballRotation.value = withSpring(0, {}, (finished) => {
            if (finished) {
              if (props.gotPokemon) {
                pokeballGotchaAnimation.value = withSequence(
                  withSpring(5, { duration: 250 }),
                  withSpring(0, { duration: 250 }, (finished) => {
                    finished && runOnJS(showGotcha)();
                  }),
                );
              } else {
                runOnJS(showGotcha)();
              }
            }
          });
        }
      },
    );
  }, []);

  return (
    <>
      <View
        style={{ height: props.size, width: props.size }}
        className="absolute overflow-hidden"
      >
        <View className="w-full h-full opacity-50 bg-white"></View>
        <Animated.Image
          style={[{ height: props.size, width: props.size }]}
          source={{ uri: props.bg }}
          className="opacity-40 absolute"
        />
      </View>
      <View className="flex-1 justify-end items-center">
        <View className="h-2/3 w-full bottom-[20%]">
          <Image
            source={require('../../../assets/images/pokemon/field.png')}
            className="w-full h-full opacity-85"
          />
          <Animated.Image
            className="h-1/4 w-1/4 absolute self-center bottom-[10%]"
            style={[animatedPokeball]}
            source={{
              uri:
                gotcha || gotcha === null
                  ? props.usedPokeball
                  : '../../../assets/images/smoke.png',
            }}
          />
        </View>
        {gotcha != null && (
          <View className="w-3/4 h-1/6 absolute top-[15%] bg-white opacity-70 border-4 items-center justify-center">
            <PrimaryText
              text={gotchaMessage}
              classname="pt-[8] text-xs w-full text-center"
            />
            <Custom8BitRoundedBorders />
          </View>
        )}
      </View>
    </>
  );
}
