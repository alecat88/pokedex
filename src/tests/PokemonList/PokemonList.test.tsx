import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { chance, createPokemon, createPokemons } from '../utils';
import { MainLayout } from '../../app/MainLayout';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../../hooks/useGetPokemons';
import { mockGetPokemonsQuery } from '../mockAPI';

describe('When the url is /pokemon', () => {
  const route = '/pokemon';

  describe('When the user land on the page', () => {
    let mockedPokemons: Pokemon[];
    beforeEach(() => {
      jest.resetAllMocks();
      mockedPokemons = createPokemons();
      const mocks = [mockGetPokemonsQuery(mockedPokemons)];
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <MainLayout />
          </MemoryRouter>
        </MockedProvider>
      );
    });

    it('display a searchbar input', async () => {
      screen.getByPlaceholderText(
        'Search for a pokemon by name, number or type'
      );
    });

    it('display the headers of the table', async () => {
      await waitFor(() => {
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Number')).toBeInTheDocument();
        expect(screen.getByText('Types')).toBeInTheDocument();
        expect(screen.getByText('Image')).toBeInTheDocument();
      });
    });

    it('display a list of pokemon with their name, number, types and image', async () => {
      for (const pokemon of mockedPokemons) {
        const { name, number, types, id, image } = pokemon;
        await waitFor(() => {
          const pokemonNameCell = screen.getByText(name);
          expect(pokemonNameCell).toBeInTheDocument();

          const pokemonNumberCell = screen.getByText(number);
          expect(pokemonNumberCell).toBeInTheDocument();

          const typeValue = types.join(', ');
          const pokemonTypeCell = screen.getByText(typeValue);
          expect(pokemonTypeCell).toBeInTheDocument();

          const pokemonImage = screen.getByAltText<HTMLImageElement>(id);
          expect(pokemonImage).toBeInTheDocument();
          expect(pokemonImage.src).toBe(image);
        });
      }
    });
  });

  describe.each([
    [
      'no pokemon',
      {
        getTestData: () => ({
          stringToType: 'NOTHING TO SHOW',
          mockedPokemons: createPokemons(),
          expectedResult: [],
        }),
      },
    ],
    [
      'a pokemon by name',
      {
        getTestData: () => {
          const bulbasaur = createPokemon({ name: 'Bulbasaur' });
          return {
            expectedResult: [bulbasaur],
            stringToType: 'Bulbasaur',
            mockedPokemons: [bulbasaur, ...createPokemons()],
          };
        },
      },
    ],
    [
      'a pokemon by name (lowercase)',
      {
        getTestData: () => {
          const bulbasaur = createPokemon({ name: 'Bulbasaur' });
          return {
            expectedResult: [bulbasaur],
            stringToType: 'bulbasaur',
            mockedPokemons: [bulbasaur, ...createPokemons()],
          };
        },
      },
    ],

    [
      'a pokemon by name (uppercase)',
      {
        getTestData: () => {
          const bulbasaur = createPokemon({ name: 'Bulbasaur' });
          return {
            expectedResult: [bulbasaur],
            stringToType: 'BULBASAUR',
            mockedPokemons: [bulbasaur, ...createPokemons()],
          };
        },
      },
    ],
    [
      'a pokemon by name (substring)',
      {
        getTestData: () => {
          const bulbasaur = createPokemon({ name: 'Bulbasaur' });
          return {
            expectedResult: [bulbasaur],
            stringToType: 'ulbasau',
            mockedPokemons: [bulbasaur, ...createPokemons()],
          };
        },
      },
    ],
    [
      'multiple pokemons by name',
      {
        getTestData: () => {
          const bulbasaur = createPokemon({ name: 'Bulbasaur' });
          const venusaur = createPokemon({ name: 'Venusaur' });
          return {
            expectedResult: [bulbasaur, venusaur],
            stringToType: 'saur',
            mockedPokemons: [bulbasaur, ...createPokemons(), venusaur],
          };
        },
      },
    ],
    [
      'a pokemon by number',
      {
        getTestData: () => {
          const randomPokemon = createPokemon();
          return {
            expectedResult: [randomPokemon],
            stringToType: randomPokemon.number,
            mockedPokemons: [randomPokemon, ...createPokemons()],
          };
        },
      },
    ],
    [
      'a pokemon by type',
      {
        getTestData: () => {
          const randomPokemon = createPokemon();
          return {
            expectedResult: [randomPokemon],
            stringToType: chance.pickone(randomPokemon.types),
            mockedPokemons: [randomPokemon, ...createPokemons()],
          };
        },
      },
    ],
  ])('When the user types a string that matches %s', (_, { getTestData }) => {
    let searchResult: Pokemon[];
    beforeEach(async () => {
      jest.resetAllMocks();
      const { mockedPokemons, stringToType, expectedResult } = getTestData();
      searchResult = expectedResult;
      const mocks = [mockGetPokemonsQuery(mockedPokemons)];
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <MainLayout />
          </MemoryRouter>
        </MockedProvider>
      );
      const user = userEvent.setup();
      const input = screen.getByPlaceholderText(
        'Search for a pokemon by name, number or type'
      );
      await screen.findByText('Name');
      await user.type(input, stringToType);
    });

    it(`show the expected result`, async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('row').length - 1).toEqual(
          searchResult.length
        );
      });
    });
  });
});
