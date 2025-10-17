import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const games = useSelector((state) => state.games.items || []);
  const likedCount = games.filter(game => game.liked).length;
  const totalGames = games.length;
  
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Каталог Игр</h1>
        <p>Избранных: {likedCount} из {totalGames}</p>
        
        <nav style={{ marginTop: '15px' }}>
          <Link 
            to="/" 
            style={{ color: '#c7d5e0', margin: '0 15px', textDecoration: 'none' }}
          >
            Главная
          </Link>
          <Link 
            to="/games" 
            style={{ color: '#c7d5e0', margin: '0 15px', textDecoration: 'none' }}
          >
            Все игры
          </Link>
          <Link 
            to="/favorites" 
            style={{ color: '#66c0f4', margin: '0 15px', textDecoration: 'none', fontWeight: '600' }}
          >
            Избранное ({likedCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;