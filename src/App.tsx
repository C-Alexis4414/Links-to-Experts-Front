import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './homePage/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;