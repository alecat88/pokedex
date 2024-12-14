import { Routes, Route } from 'react-router-dom';
import { Nav } from '../components';
import { Home, ListPage } from '../screens';
import { createUseStyles } from 'react-jss';
import { Test } from './Test';

export const MainLayout = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <div className={classes.content}>
        <div className={classes.scrollableArea}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<ListPage />} />
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
