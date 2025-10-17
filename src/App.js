import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GamesPage from './pages/GamesPage';
import FavoritesPage from './pages/FavoritesPage';
import Detail from './pages/Detail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/game/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;