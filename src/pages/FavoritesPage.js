import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";

function FavoritesPage() {
    const games = useSelector((state) => state.games.items || []);
    const dispatch = useDispatch();
    
    const favoriteGames = games.filter(game => game.liked);

    const removeFromFavorites = (gameId) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: gameId });
        dispatch({ type: 'TOGGLE_LIKE', payload: gameId });
    };

    return (
        <Layout>
            <div style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center", color: "#66c0f4" }}>Избранные игры</h2>
                {favoriteGames.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#8f98a0" }}>Нет избранных игр</p>
                ) : (
                    <div className="games-grid">
                        {favoriteGames.map((game) => (
                            <div key={game.id} className="game-card">
                                <div className="game-image-container">
                                    <img src={game.img} alt={game.title} className="game-image" />
                                    <div className="game-rating">★ {game.rating}</div>
                                </div>
                                <h3 className="game-title">{game.title}</h3>
                                <p className="game-genre">{game.genre}</p>
                                <button 
                                    className="like-btn liked"
                                    onClick={() => removeFromFavorites(game.id)}
                                >
                                    Удалить из избранного
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default FavoritesPage;