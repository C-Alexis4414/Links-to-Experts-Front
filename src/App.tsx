import HomePage from './pages/homePage';
import RootLayout from '@/layout';
import Navbar from '@/components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/login';
import Register from '@/pages/register';
import PageNotFound from '@/pages/pageNotFound';
import { AuthProvider } from '@/context/authContext';
import { Protected } from '@/guard/protected';
import Profile from '@/pages/profile';
import UserForm from '@/pages/userForm';
import Subscriptions from '@/pages/subscriptions';
import Categories from '@/pages/categories';
import WelcomePage from './pages/welcome';
import { Public } from './guard/public';

function App() {
  return (
    <AuthProvider>
      <RootLayout>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/welcome' element={<Public> <WelcomePage/></Public>} />
            <Route path="/" element={ <Protected><HomePage /></Protected>} />
            <Route path="login" element={<Public><Login /></Public>} />
            <Route path="register" element={<Protected><Register /></Protected>} />
            <Route path="profile" element={<Protected>
              <Profile />
            </Protected>} />
            <Route path="profile/edit" element={<Protected>
              <UserForm />
            </Protected>} />
            <Route path="profile/subscriptions" element={<Protected>
              <Subscriptions />
            </Protected>} />
            <Route path="profile/categories" element={<Protected>
              <Categories />
            </Protected>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </RootLayout>
    </AuthProvider>
  );
}

export default App;