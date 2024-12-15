import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { PokemonDetail } from '../PokemonDetail';
import { PokemonWithDetails } from '../../hooks/types';
import { createUseStyles } from 'react-jss';

export const PokemonDialog = () => {
  const classes = useStyles();
  let urlParams = useParams();
  const navigate = useNavigate();
  const { pokemonId, pokemonName } = urlParams;
  const [open, setOpen] = React.useState(true);
  const { pokemon, loading } = useGetPokemon({ pokemonId, pokemonName });
  const [pokemonWithDetails, setPokemonWithDetails] =
    useState<null | PokemonWithDetails>(null);

  useEffect(() => {
    setPokemonWithDetails(pokemon);
    return () => {
      setPokemonWithDetails(null);
    };
  }, [pokemon]);

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(true);
    };
  }, [urlParams]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/pokemon/`);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span className={classes.title}>{pokemonWithDetails?.name ?? ''}</span>
      </DialogTitle>
      <DialogContent>
        {loading && (
          <DialogContentText id="alert-dialog-loading">
            <span className={classes.loading}>Loading...</span>
          </DialogContentText>
        )}
        {!loading && pokemonWithDetails && (
          <DialogContent id="alert-dialog-description">
            <PokemonDetail pokemonWithDetails={pokemonWithDetails} />
          </DialogContent>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    title: {
      color: 'black',
    },
    loading: {
      color: 'black',
    },
  },
  { name: 'PokemonDialog' }
);
