import { Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

export const SnackbarContext = createContext({});

function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (msg) => {
    setOpen(true);
    setMessage(msg);
  };

  const onClose = () => {
    setOpen(false);
    setMessage('');
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
      }}>
      {children}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={onClose}
        message={message}
        key={'top-right-snackbar'}
        autoHideDuration={4000}
      />
    </SnackbarContext.Provider>
  );
}

function useSnackbar() {
  const context = useContext(SnackbarContext);

  return context;
}

export { SnackbarProvider, useSnackbar };
