import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useMemo, useState } from 'react';

export const SnackbarContext = createContext({});

function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const openSnackbar = useMemo(() => {
    const success = (msg) => {
      setOpen(true);
      setMessage(msg);
      setSeverity('success');
    };

    const error = (msg) => {
      setOpen(true);
      setMessage(msg);
      setSeverity('error');
    };

    return { success, error };
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
        onClose={onClose}
        key={'top-right-snackbar'}
        autoHideDuration={3000}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
