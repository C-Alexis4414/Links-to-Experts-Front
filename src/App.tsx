import HomePage from './pages/homePage';
import RootLayout from './layout';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/pageNotFound';
import { AuthProvider } from './context/AuthContext';

function App() {
  // return (
  //   <RootLayout>
  //     <Navbar />
  //     <HomePage />
  //   </RootLayout>
  // );
  return (
  <RootLayout>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </RootLayout>
  );
}

export default App;