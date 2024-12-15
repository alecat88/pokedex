import { PokemonWithDetails } from "../hooks/types";
import { Pokemon } from "../hooks/useGetPokemons";
import { MOCKED_GET_POKEMON, MOCKED_GET_POKEMONS } from "./helpers";

export const mockGetPokemonsQuery = (pokemons: Pokemon[]) => 
  ({
    request: {
      query: MOCKED_GET_POKEMONS,
      variables: {
        first: 151,
      },
    },
    result: {
      data: {
        pokemons,
      },
    },
  })

export const mockGetPokemonQuery = (pokemon: PokemonWithDetails) => 
  ({
    request: {
      query: MOCKED_GET_POKEMON,
      variables: {
        id: pokemon.id,
        name: pokemon.name,
      },
    },
    result: {
      data: {
        pokemon
      },
    },
  })
