import { act, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainLayout } from '../../app/MainLayout';
import { mockGetPokemonQuery, mockGetPokemonsQuery } from '../mockAPI';
import { createPokemons, createPokemonWithDetails } from '../utils';
import { MockedProvider } from '@apollo/client/testing';
import { PokemonWithDetails } from '../../hooks/types';
import userEvent from '@testing-library/user-event';

describe('When the url is /pokemon/ and the user click on a pokemon', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    const pokemonWithDetails = createPokemonWithDetails();
    const mocks = [
      mockGetPokemonsQuery([...createPokemons(), pokemonWithDetails]),
      mockGetPokemonQuery(pokemonWithDetails),
    ];
    const route = `/pokemon`;

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <MainLayout />
        </MemoryRouter>
      </MockedProvider>
    );

    const pokemon = await screen.findByText(pokemonWithDetails.name);
    const user = userEvent.setup();
    await act(async () => {
      await user.click(pokemon);
    });
  });

  it('display a dialog with the a loading screen', async () => {
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});

describe('When the url is /pokemon/id/name', () => {
  let pokemonWithDetails: PokemonWithDetails;
  beforeEach(() => {
    jest.resetAllMocks();
    pokemonWithDetails = createPokemonWithDetails();
    const { name, id } = pokemonWithDetails;
    const mocks = [
      mockGetPokemonsQuery(createPokemons()),
      mockGetPokemonQuery(pokemonWithDetails),
    ];
    const route = `/pokemon/${id}/${name}`;

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <MainLayout />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('display a dialog with the a loading screen', async () => {
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      within(dialog).getByText('Loading...');
    });
  });

  it('display the Pokemon Name', async () => {
    await waitFor(() => {
      expect(screen.getByText(pokemonWithDetails.name)).toBeInTheDocument();
    });
  });

  it('display the Pokemon Classification', async () => {
    await waitFor(() => {
      expect(screen.getByText('Classification:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.classification)
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon FleeRate', async () => {
    await waitFor(() => {
      expect(screen.getByText('Flee rate:')).toBeInTheDocument();
      expect(screen.getByText(pokemonWithDetails.fleeRate)).toBeInTheDocument();
    });
  });
  it('display the Pokemon Maximum height', async () => {
    await waitFor(() => {
      expect(screen.getByText('Maximum height:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.height.maximum)
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Minimum height', async () => {
    await waitFor(() => {
      expect(screen.getByText('Minimum height:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.height.minimum)
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Max CP', async () => {
    await waitFor(() => {
      expect(screen.getByText('Max CP:')).toBeInTheDocument();
      expect(screen.getByText(pokemonWithDetails.maxCP)).toBeInTheDocument();
    });
  });
  it('display the Pokemon Max HP', async () => {
    await waitFor(() => {
      expect(screen.getByText('Max HP:')).toBeInTheDocument();
      expect(screen.getByText(pokemonWithDetails.maxHP)).toBeInTheDocument();
    });
  });
  it('display the Pokemon Number', async () => {
    await waitFor(() => {
      expect(screen.getByText('Number:')).toBeInTheDocument();
      expect(screen.getByText(pokemonWithDetails.number)).toBeInTheDocument();
    });
  });
  it('display the Pokemon Resistant', async () => {
    await waitFor(() => {
      expect(screen.getByText('Resistant:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.resistant.join(', '))
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Types', async () => {
    await waitFor(() => {
      expect(screen.getByText('Types:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.types.join(', '))
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Weaknesses', async () => {
    await waitFor(() => {
      expect(screen.getByText('Weaknesses:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.weaknesses.join(', '))
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Maximum weight', async () => {
    await waitFor(() => {
      expect(screen.getByText('Maximum weight:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.weight.maximum)
      ).toBeInTheDocument();
    });
  });
  it('display the Pokemon Minimum weight', async () => {
    await waitFor(() => {
      expect(screen.getByText('Minimum weight:')).toBeInTheDocument();
      expect(
        screen.getByText(pokemonWithDetails.weight.minimum)
      ).toBeInTheDocument();
    });
  });
});
