import { createUseStyles } from 'react-jss';
import { PokemonWithDetails } from '../../hooks/types';

export const PokemonDetail = ({
  pokemonWithDetails,
}: {
  pokemonWithDetails: PokemonWithDetails;
}) => {
  const classes = useStyles();
  const {
    classification,
    fleeRate,
    height,
    image,
    maxCP,
    maxHP,
    name,
    number,
    resistant = [],
    types = [],
    weaknesses = [],
    weight,
  } = pokemonWithDetails;

  const pokemonDetailsMapping = {
    Classification: classification,
    'Flee rate': fleeRate,
    'Maximum height': height?.maximum,
    'Minimum height': height?.minimum,
    'Max CP': maxCP,
    'Max HP': maxHP,
    Number: number,
    Resistant: resistant.join(', '),
    Types: types.join(', '),
    Weaknesses: weaknesses.join(', '),
    'Maximum weight': weight?.maximum,
    'Minimum weight': weight?.minimum,
  };

  return (
    <div className={classes.root}>
      <div>
        <img alt={name} src={image} className={classes.image} />
      </div>
      <div>
        <table>
          <tbody>
            {Object.entries(pokemonDetailsMapping).map(([key, value]) => (
              <tr key={key}>
                <td className={classes.header}>{key}:</td>
                <td className={classes.cell}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'left',
      display: 'flex',
    },
    image: {
      width: '100px',
      paddingRight: '30px',
    },
    header: {
      color: 'black',
      fontWeight: 'bold',
    },
    cell: {
      color: 'black',
    },
  },
  { name: 'PokemonTable' }
);
