import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ConfirmProvider } from 'material-ui-confirm'
// import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import store from '~/redux/store'
import '~/customLibraries/i18n'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme} noSsr disableTransitionOnChange defaultMode='light'>
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          dialogProps: { maxWidth: 'xs' },
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' }
        }}>
          <GlobalStyles styles={{
            a: {
              textDecoration: 'none',
              color: 'inherit'
            }
          }} />
          <CssBaseline />
          <App />
          <Toaster />
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
