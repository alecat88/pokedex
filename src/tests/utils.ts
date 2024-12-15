import Chance from 'chance';

export const chance = new Chance();

export const createPokemon = ({name, number, types} : {name?: string, number?: string, types?: string[]} = {}) => ({
    id: chance.string(),
    name: name ?? chance.word(),
    number: number ?? chance.string({ numeric: true }),
    types: types ?? Array.from({ length: chance.natural({ min: 1, max: 4 }) }, () =>
      chance.word()
    ),
    image: chance.url()
  });


  export const createPokemons = (amount: number = chance.natural({ min: 1, max: 10 })) => Array.from(
    { length: amount },
    createPokemon
  );