import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { createPokemons } from '../utils';
import { MainLayout } from '../../app/MainLayout';
import { MOCKED_GET_POKEMONS } from './helpers';

const mockedPokemons = createPokemons();

const mocks = [
  {
    request: {
      query: MOCKED_GET_POKEMONS,
      variables: {
        first: 151,
      },
    },
    result: {
      data: {
        pokemons: mockedPokemons,
      },
    },
  },
];

describe('When the url is /pokemon', () => {
  const route = '/pokemon';
  beforeEach(() => {
    jest.resetAllMocks();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <MainLayout />
        </MemoryRouter>
      </MockedProvider>
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
