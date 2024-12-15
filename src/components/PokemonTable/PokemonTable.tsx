import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { PokemonRow } from '../PokemonRow';

export const PokemonTable = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const classes = useStyles();
  return (
    <table className={classes.root}>
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
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'left',
      borderSpacing: 0,
      tableLayout: 'fixed',
    },
  },
  { name: 'PokemonTable' }
);
