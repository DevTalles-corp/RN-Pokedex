import {getColorFromImage} from '../../config/helpers/get-color';
import type {Pokemon} from '../../domain/entities/pokemon';
import type {PokeAPIPokemon} from '../interfaces/pokepi.interfaces';

export class PokemonMapper {
  static async pokeApiPokemonToEntity(data: PokeAPIPokemon): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    const color = await getColorFromImage(avatar);

    return {
      id: data.id,
      name: data.name,
      avatar: avatar,
      sprites: sprites,
      types: data.types.map(type => type.type.name),
      color: color,

      games: data.game_indices.map(game => game.version.name),
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      abilities: data.abilities.map(ability => ability.ability.name),
      moves: data.moves
        .map(move => ({name: move.move.name, level: move.version_group_details[0].level_learned_at }))
        .sort((a, b) => a.level - b.level)
      ,
    };
  }

  static getSprites(data: PokeAPIPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}
