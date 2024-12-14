import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonRow } from '../PokemonRow';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Types</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <PokemonRow key={pokemon.id} pokemon={pokemon} />
            ))}
          </tbody>
        </table>
      )}
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
    table: {
      width: '100%',
      textAlign: 'left',
      borderSpacing: 0,
    },
  },
  { name: 'PokemonList' }
);
