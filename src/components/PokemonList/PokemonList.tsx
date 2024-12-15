import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { SearchBar } from '../SearchBar';
import { PokemonTable } from '../PokemonTable';
import { getFilteredPokemon } from './helper';
import { Outlet } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    const filteredPokemons = getFilteredPokemon({ pokemons, filterString });

    setFilteredPokemons(
      pokemons.map((pokemon) => {
        /*
        A tradeoff was made in this point.

        The easier and cleaner solution is to just filter the array of pokemon and set it in the state.
        The problem with that solution is that the HTML would have to reload all the images of the hidden
        pokemons once the search was reset back, giving a sluggish UI experience.

        I've instead opted for a slightly complex solution: we want to return the full pokemon array with a "isVisible" flag,
        so the PokemonRow component will know when to just 'hide' a component rather than removing it from the DOM.
        This way, the UI experience is smooth when resetting the search field back to an empty string.
        */

        const isPokemonVisible = filteredPokemons.find(
          (filteredPokemon) => filteredPokemon.id === pokemon.id
        );
        return {
          ...pokemon,
          isVisible: isPokemonVisible,
        };
      })
    );
    return () => {
      setFilteredPokemons(pokemons);
    };
  }, [pokemons, filterString]);

  const handleSearchPokemon = (input: string) => {
    setFilterString(input);
  };

  return (
    <div className={classes.root}>
      <SearchBar
        onChange={handleSearchPokemon}
        placeHolder="Search for a pokemon by name, number or type"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PokemonTable pokemons={filteredPokemons} />
      )}
      <Outlet />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
  },
  { name: 'PokemonList' }
);
