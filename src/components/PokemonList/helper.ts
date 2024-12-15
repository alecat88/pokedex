import { Pokemon } from "../../hooks/useGetPokemons";

/*
 Functions have been splitted to follow the SRP solid principle
*/

const getIsMatchingPokemonByName = ({
    pokemon,
    filterString,
  }: {
    pokemon: Pokemon;
    filterString: string;
  }) => pokemon.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1;

  const getIsMatchingPokemonByNumber = ({
    pokemon,
    filterString,
  }: {
    pokemon: Pokemon;
    filterString: string;
  }) => pokemon.number.toLowerCase().indexOf(filterString.toLowerCase()) !== -1;

  const getIsMatchingPokemonByType = ({
    pokemon,
    filterString,
  }: {
    pokemon: Pokemon;
    filterString: string;
  }) =>
    pokemon.types.join('').toLowerCase().indexOf(filterString.toLowerCase()) !==
    -1;
  
  export  const getFilteredPokemon = ({
    pokemons,
    filterString,
  }: {
    pokemons: Pokemon[];
    filterString: string;
  }) =>
    pokemons.filter((pokemon) => {
      const isPokemonMatchedByName = getIsMatchingPokemonByName({
        pokemon,
        filterString,
      });
      const isPokemonMatchedByNumber = getIsMatchingPokemonByNumber({
        pokemon,
        filterString,
      });
      const isPokemonMatchedByType = getIsMatchingPokemonByType({
        pokemon,
        filterString,
      });
  
      return (
        isPokemonMatchedByName ||
        isPokemonMatchedByNumber ||
        isPokemonMatchedByType
      );
    });