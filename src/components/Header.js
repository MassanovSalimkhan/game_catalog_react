import React, { useState, useEffect } from 'react';

function Header() {
    const [likedCount, setLikedCount] = useState(0);
    const [totalGames, setTotalGames] = useState(0);

    useEffect(() => {
        // Загружаем данные для header
        import('../data/games.json')
        .then(module => {
            setTotalGames(module.default.length);
        });

        const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
        setLikedCount(likedGames.length);
    }, []);

    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Каталог Игр</h1>
                <p>Избранных: {likedCount} из {totalGames}</p>
            </div>
        </header>
    );
}

export default Header;