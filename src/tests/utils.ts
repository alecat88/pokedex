import Chance from 'chance';
import { PokemonWithDetails } from '../hooks/types';

export const chance = new Chance();
const createArrayOfString = () => Array.from({ length: chance.natural({ min: 1, max: 4 }) }, () =>
  chance.word()
);
export const createPokemon = ({name, number, types} : {name?: string, number?: string, types?: string[]} = {}) => ({
    id: chance.string({ numeric: true}),
    name: name ?? chance.word({length: chance.natural({ min: 10, max: 20 }) }),
    number: number ?? chance.string({ numeric: true }),
    types: types ?? createArrayOfString(),
    image: chance.url()
  });


  export const createPokemons = (amount: number = chance.natural({ min: 1, max: 10 })) => Array.from(
    { length: amount },
    createPokemon
  );

  export const createPokemonWithDetails = () : PokemonWithDetails  => ({
    ...createPokemon(),
    "weight": {
        "minimum": chance.string(),
        "maximum": chance.string(),
      },
      "height": {
        "minimum": chance.string(),
        "maximum": chance.string(),
      },
      "classification": chance.string(),
      "resistant": createArrayOfString(),
      "weaknesses": createArrayOfString(),
      "fleeRate": chance.natural(),
      "maxCP": chance.natural(),
      "maxHP": chance.natural(),
  });