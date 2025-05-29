import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { PokemonList } from './PokemonList';

// Mock the useGetPokemons hook
jest.mock('../../hooks/useGetPokemons', () => ({
  useGetPokemons: () => ({
    pokemons: [
      {
        id: '1',
        name: 'Bulbasaur',
        number: '001',
        types: ['Grass', 'Poison'],
        image: 'bulba.png',
      },
      {
        id: '4',
        name: 'Charmander',
        number: '004',
        types: ['Fire'],
        image: 'char.png',
      },
    ],
    loading: false,
  }),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
  };
});

describe('PokemonList', () => {
  it('renders the search box and pokemons', () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('filters pokemons by search', () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search pokémon/i);
    fireEvent.change(input, { target: { value: 'bulb' } });
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  });

  it('navigates when a pokemon is clicked', () => {
    const navigate = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Bulbasaur/i));
    expect(navigate).toHaveBeenCalledWith('/pokemon/1');
  });
});
