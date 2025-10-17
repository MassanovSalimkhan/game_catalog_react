import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function GamesPage(){
    const games = useSelector((state) => state.games.items || []);
    const favorites = useSelector((state) => state.favorites.list || []);
    const dispatch = useDispatch();
    const toggleFavorite = (game) => {
        const isInFavorites = favorites.some(item => item.id === game.id);
        
        if (isInFavorites) {
            dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: game.id });
            dispatch({ type: 'TOGGLE_LIKE', payload: game.id });
        } else {
            dispatch({ type: 'ADD_TO_FAVORITES', payload: game });
            dispatch({ type: 'TOGGLE_LIKE', payload: game.id });
        }
    };

    const likedCount = games.filter(game => game.liked).length;

    return(
        <Layout>
            <div style={{padding:'20px'}}>
                <h2 style={{textAlign: 'center', color: '#66c0f4'}}>Список игр</h2>
                <p style={{textAlign: 'center', color: '#c7d5e0'}}>
                    Избранных: {likedCount} из {games.length}
                </p>
                
                <div className="games-grid">
                    {games.map(game => {
                        const isInFavorites = favorites.some(item => item.id === game.id);
                        const isLiked = game.liked || isInFavorites;
                        
                        return (
                            <div key={game.id} className="game-card">
                                <div className="game-image-container">
                                    <img src={game.img} alt={game.title} className="game-image" />
                                    <div className="game-rating">★ {game.rating}</div>
                                </div>
                                
                                <Link to={`/game/${game.id}`} className="game-title-link">
                                    <h3 className="game-title">{game.title}</h3>
                                </Link>
                                <p className="game-genre">{game.genre}</p>
                                
                                <button
                                    className={isLiked ? "like-btn liked" : "like-btn"}
                                    onClick={() => toggleFavorite(game)}
                                >
                                    {isLiked ? "Удалить из избранного" : "В избранное"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default GamesPage;