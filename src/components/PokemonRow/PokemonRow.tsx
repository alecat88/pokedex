import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';

export const PokemonRow = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();
  return (
    <tr key={pokemon.id} className={classes.row}>
      <td className="name">{pokemon.name}</td>
      <td>{pokemon.number}</td>
      <td>{pokemon.types.join(', ')}</td>
      <td className={classes.imageCell}>
        <img alt={pokemon.id} src={pokemon.image} className={classes.image} />
      </td>
    </tr>
  );
};

const useStyles = createUseStyles(
  {
    row: {
      '&:hover': {
        backgroundColor: '#ff0000',
        cursor: 'pointer',
      },
    },
    imageCell: {
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      width: '50px',
    },
  },
  { name: 'PokemonRow' }
);
