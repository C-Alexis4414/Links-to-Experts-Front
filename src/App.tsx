import HomePage from './pages/homePage';
import RootLayout from './layout';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/pageNotFound';
import { AuthProvider } from './context/AuthContext';
import { Protected } from './guard/protected';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <AuthProvider>
      <RootLayout>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Protected>
              <Dashboard />
            </Protected>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </RootLayout>
    </AuthProvider>
  );
}

export default App;