import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadGamesAction, toggleLikeAction } from "../redux/actions";
import Layout from "../components/Layout";

function GamesPage(){
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGamesAction());
    }, [dispatch]);

    const likedCount = games.filter(game => game.liked).length;

    return(
        <Layout>
            <div style={{padding:'20px'}}>
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <h2 style={{color: '#66c0f4', marginBottom: '10px'}}>Список игр</h2>
                    <p style={{color: '#c7d5e0'}}>Избранных: {likedCount} из {games.length}</p>
                </div>
                
                <div className="games-grid">
                    {games.map(game=>(
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
                                className={game.liked ? "like-btn liked" : "like-btn"}
                                onClick={() => dispatch(toggleLikeAction(game.id))}
                            >
                                {game.liked ? "В избранном" : "В избранное"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default GamesPage;