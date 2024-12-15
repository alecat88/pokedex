import { Routes, Route } from 'react-router-dom';
import { Nav } from '../components';
import { Home, ListPage } from '../screens';
import { createUseStyles } from 'react-jss';
import { PokemonDialog } from '../components/PokemonDialog';

export const MainLayout = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <div className={classes.content}>
        <div className={classes.scrollableArea}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<ListPage />}>
              <Route
                path=":pokemonId/:pokemonName"
                element={<PokemonDialog />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

const useStyles = createUseStyles(
  {
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'MainLayout' }
);
