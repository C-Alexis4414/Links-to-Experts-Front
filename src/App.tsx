import HomePage from './homePage/page';
import RootLayout from './layout';
import Navbar from './components/navbar';

function App() {
  return (
    <RootLayout>
      <Navbar />
      <HomePage />
    </RootLayout>
  );
}

export default App;