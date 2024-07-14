import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Reports from './pages/Reports';
import TabbedPage from './pages/TabbedPage';
import BrokerReportCard  from './pages/BrokerReportCard'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/trade-performance" element={<Reports />} />
            <Route path='/broker-report-card' element={<BrokerReportCard/>} />
            <Route path="reports/*" element={<TabbedPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
