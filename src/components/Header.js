import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const games = useSelector((state) => state.games.items || []);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const likedCount = games.filter(game => game.liked).length;
  
  return (
    <header className="app-header">
      <nav style={{ marginTop: '15px' }}>
        <Link to="/" style={{ color: '#c7d5e0', margin: '0 10px', textDecoration: 'none' }}>
          Главная
        </Link>
        <Link to="/games" style={{ color: '#c7d5e0', margin: '0 10px', textDecoration: 'none' }}>
          Игры
        </Link>
        <Link to="/favorites" style={{ color: '#c7d5e0', margin: '0 10px', textDecoration: 'none' }}>
          Избранное ({likedCount})
        </Link>
        <Link to="/register" style={{ color: '#c7d5e0', margin: '0 10px', textDecoration: 'none' }}>
          Регистрация
        </Link>
        <Link to="/login" style={{ color: '#c7d5e0', margin: '0 10px', textDecoration: 'none' }}>
          Вход
        </Link>
        {currentUser && (
          <span style={{ color: '#c7d5e0', margin: '0 10px' }}>
            Привет, {currentUser.username}!
          </span>
        )}
      </nav>
    </header>
  );
}

export default Header;