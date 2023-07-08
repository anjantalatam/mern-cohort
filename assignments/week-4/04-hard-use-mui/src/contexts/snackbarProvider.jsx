import { Snackbar } from '@mui/material';
import { createContext, useCallback, useState } from 'react';

export const SnackbarContext = createContext({});

function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = useCallback((msg) => {
    setOpen(true);
    setMessage(msg);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setMessage('');
  }, []);

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

export default SnackbarProvider;
