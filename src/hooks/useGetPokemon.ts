import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon, PokemonOption } from './useGetPokemons';
import { PokemonWithDetails } from './types';

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemon = ({pokemonName, pokemonId}: {pokemonName?: string, pokemonId?: string}) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemonName,
      id: pokemonId
    },
  });

  const pokemon: PokemonWithDetails = useMemo(() => data?.pokemon || {}, [data]);


  return {
    pokemon,
    ...queryRes,
  };
};
