import {View} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {useEffect, useState} from 'react';
import {Pokemon} from '../../../domain/entities/pokemon';
import {useQuery} from '@tanstack/react-query';


export const HomeScreen = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return (
    <View>
      <Text variant="displaySmall">HomeScreen</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}


    </View>
  );
};
