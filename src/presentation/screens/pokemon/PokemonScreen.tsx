import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackParams} from '../../navigator/StackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions/pokemons';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {Chip, Text} from 'react-native-paper';
import {Formatter} from '../../../config/helpers/formatter';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {isDark} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const {pokemonId} = route.params;

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>

      <FlatList
        data={pokemon.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
