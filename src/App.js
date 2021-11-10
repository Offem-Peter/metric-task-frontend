import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import AppRoutes from './routes';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#1EA5AE',
    },
    primary: {
      main: '#FF355E',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes>
        <NavBar />
      </AppRoutes>
      <ToastContainer
        theme="light"
        position="bottom-left"
        newestOnTop={true}
        pauseOnHover={false}
      />
    </ThemeProvider>
  );
}

export default App;
