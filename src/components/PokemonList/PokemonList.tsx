import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStyles } from './PokemonList.styles';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const PokemonList = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams();

  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  const [search, setSearch] = useState('');

  const handleOpen = (pkmn: Pokemon) => {
    navigate(`/pokemon/${pkmn.id}`);
  };

  const handleClose = () => {
    navigate('/pokemon');
  };

  const selectedFromRoute = pokemons.find((p) => p.id === routeId);

  // Filter pokemons by search term (case-insensitive)
  const filteredPokemons = pokemons.filter((pkmn) =>
    pkmn.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.searchBox}
      />
      <div className={classes.listContainer}>
        {loading && <div>Loading...</div>}
        {filteredPokemons.map((pkmn) => (
          <div
            key={pkmn.id}
            className={classes.item}
            onClick={() => handleOpen(pkmn)}
            style={{ cursor: 'pointer' }}
          >
            <div className={classes.header}>
              <span className={classes.name}>{pkmn.name}</span>
              <span className={classes.number}>#{pkmn.number}</span>
            </div>
            <img className={classes.img} src={pkmn.image} alt={pkmn.name} />
            <div className={classes.types}>Type: {pkmn.types.join(', ')}</div>
          </div>
        ))}
      </div>

      <Modal open={!!selectedFromRoute} onClose={handleClose}>
        <Box className={classes.modalBox}>
          {selectedFromRoute && (
            <PokemonDetailsModalContent
              id={selectedFromRoute.id}
              name={selectedFromRoute.name}
              classes={classes}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  classes,
}: {
  label: string;
  value: React.ReactNode;
  classes: ReturnType<typeof useStyles>;
}) => (
  <div className={classes.detailRow}>
    <span className={classes.label}>{label}</span>
    <span className={classes.value}>{value}</span>
  </div>
);

// Helper component to fetch and display details
const PokemonDetailsModalContent = ({
  id,
  name,
  classes,
}: {
  id: string;
  name: string;
  classes: ReturnType<typeof useStyles>;
}) => {
  const { pokemon, loading, error } = useGetPokemonDetails(id, name);

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details.</div>;
  if (!pokemon) return <div>No details found.</div>;

  const p = pokemon;
  return (
    <>
      <div className={classes.header}>
        <span className={classes.name}>{p.name}</span>
        <span className={classes.number}>#{p.number}</span>
      </div>
      <img src={p.image} alt={p.name} className={classes.img} />
      <h2>Details</h2>
      <DetailRow label="Type:" value={p.types.join(', ')} classes={classes} />
      <DetailRow
        label="Weight:"
        value={`${p.weight.minimum} - ${p.weight.maximum}`}
        classes={classes}
      />
      <DetailRow
        label="Height:"
        value={`${p.height.minimum} - ${p.height.maximum}`}
        classes={classes}
      />
      <DetailRow
        label="Classification:"
        value={p.classification}
        classes={classes}
      />
      <DetailRow
        label="Resistant:"
        value={p.resistant.join(', ')}
        classes={classes}
      />
      <DetailRow
        label="Weaknesses:"
        value={p.weaknesses.join(', ')}
        classes={classes}
      />
      <DetailRow label="Flee Rate:" value={p.fleeRate} classes={classes} />
      <DetailRow label="Max CP:" value={p.maxCP} classes={classes} />
      <DetailRow label="Max HP:" value={p.maxHP} classes={classes} />
    </>
  );
};
