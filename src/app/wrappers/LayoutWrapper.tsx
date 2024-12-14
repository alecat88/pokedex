import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from '../../contexts';
import { MainLayout } from '../MainLayout';
import { createUseStyles } from 'react-jss';

export const LayoutWrapper = () => {
  const classes = useStyles();

  return (
    <LayoutProvider>
      <div className={classes.root}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </div>
    </LayoutProvider>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
  },
  { name: 'LayoutWrapper' }
);
