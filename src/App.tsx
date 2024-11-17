import HomePage from './pages/homePage';
import RootLayout from './layout';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/pageNotFound';
import  Grid  from '@mui/material/Grid2';

function App() {
  return (
  <RootLayout>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </RootLayout>
  );
}

export default App;