import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    listContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 24,
      padding: '32px',
      boxSizing: 'border-box',
      width: '100%',
    },
    item: {
      flex: '1 1 300px',
      minWidth: 220,
      margin: '16px 0',
      padding: '16px',
      borderRadius: '8px',
      transition: 'background 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      '&:hover': {
        background: '#778899',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        color: '#fff',
      },
    },
    // Responsive breakpoints
    '@media (max-width: 900px)': {
      item: {
        flex: '1 1 45%',
        maxWidth: '45%',
      },
    },
    '@media (max-width: 600px)': {
      item: {
        flex: '1 1 100%',
        maxWidth: '100%',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      fontWeight: 600,
      fontSize: 18,
    },
    infoText: {
      color: '#353839',
      fontSize: 18,
    },
    name: {
      composes: '$infoText',
      textAlign: 'left',
    },
    number: {
      composes: '$infoText',
      textAlign: 'right',
    },
    types: {
      composes: '$infoText',
      marginTop: 8,
    },
    img: {
      maxWidth: '100%',
      maxHeight: '279px',
      width: 'auto',
      objectFit: 'contain',
      marginTop: 8,
      marginBottom: 8,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '4px 0',
    },
    label: {
      fontWeight: 600,
      color: '#333',
    },
    value: {
      color: '#555',
      textAlign: 'right',
    },
    searchBox: {
      color: '#888',
      marginBottom: 24,
      padding: 8,
      fontSize: 16,
      width: 240,
      borderRadius: 4,
      border: '1px solid #ccc',
      '&:focus': {
        borderColor: '#007bff',
        outline: 'none',
      },
    },
    modalBox: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff', // or use theme.palette.background.paper if using theme
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
      padding: 32,
      minWidth: 400,
      outline: 'none',
    },
  },
  { name: 'PokemonList' }
);
