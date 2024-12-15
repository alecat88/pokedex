import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom';
/*
  A tradeoff was made at line 26:  style={{ display: pokemon?.isVisible ? 'table-row' : 'none' }}
  
  The choice of using the 'display' css value was made because in this way the main table won't suffer from a 
  sluggish UI experience because of slow image rendering when filtering the pokemons thought the search bar 
  and resetting the search bar to an empty string.
*/
export const PokemonRow = ({
  pokemon,
}: {
  pokemon: Pokemon & { isVisible?: boolean };
}) => {
  const navigate = useNavigate();

  const handleOnRowClick = () => {
    navigate(`/pokemon/${pokemon.id}/${pokemon.name}`);
  };
  const classes = useStyles();
  return (
    <tr
      className={classes.row}
      role="row"
      style={{ display: pokemon?.isVisible ? 'table-row' : 'none' }}
      onClick={handleOnRowClick}
    >
      <td className="name" role="cell">
        {pokemon.name}
      </td>
      <td role="cell">{pokemon.number}</td>
      <td role="cell">{pokemon.types.join(', ')}</td>
      <td role="cell" className={classes.imageCell}>
        <img alt={pokemon.id} src={pokemon.image} className={classes.image} />
      </td>
    </tr>
  );
};

const useStyles = createUseStyles(
  {
    row: {
      '&:hover': {
        backgroundColor: '#216be3',
        cursor: 'pointer',
      },
    },
    imageCell: {
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      maxWidth: '50px',
      maxHeight: '50px',
      width: 'auto',
    },
  },
  { name: 'PokemonRow' }
);
