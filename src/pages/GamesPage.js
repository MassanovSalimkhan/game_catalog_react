import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function GamesPage(){
    const dispatch = useDispatch();
    const { items: games, filter } = useSelector((state) => state.games);
    const favorites = useSelector((state) => state.favorites.list || []);
    const filteredGames = 
        filter === "all"
        ? games
        : games.filter((game) => game.genre.includes(filter));

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

    return(
        <Layout>
            <div style={{padding: "20px"}}>
                <h2 style={{textAlign: 'center', color: '#66c0f4'}}>Каталог игр</h2>

                {/* ВЫПАДАЮЩИЙ СПИСОК */}
                <div style={{marginBottom: "30px", textAlign: "center"}}>
                    <label style={{color: '#c7d5e0', marginRight: '10px', fontSize: '1.1rem'}}>
                        Фильтр по жанру:
                    </label>
                    <select 
                        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
                        value={filter}
                        style={{
                            padding: "10px 15px",
                            fontSize: "1rem",
                            background: "#2a475e",
                            color: "#c7d5e0",
                            border: "2px solid #66c0f4",
                            borderRadius: "4px",
                            minWidth: "200px",
                            cursor: "pointer"
                        }}
                    >
                        <option value="all">Все игры</option>
                        <option value="Шутер">Шутеры</option>
                        <option value="Экшен">Экшен</option>
                        <option value="RPG">RPG</option>
                        <option value="Стратегия">Стратегия</option>
                        <option value="Сюжет">Сюжетные</option>
                        <option value="Гонки">Гонки</option>
                        <option value="Спорт">Спорт</option>
                        <option value="Хоррор">Хоррор</option>
                        <option value="Баттл-рояль">Баттл-рояль</option>
                    </select>
                </div>

                {/* Информация о фильтрации */}
                <div style={{
                    textAlign: "center", 
                    marginBottom: "20px",
                    padding: "10px",
                    background: "#2a475e",
                    borderRadius: "4px"
                }}>
                    <p style={{color: '#c7d5e0', margin: 0}}>
                        Показано игр: <strong>{filteredGames.length}</strong> из <strong>{games.length}</strong>
                        {filter !== "all" && <span> • Фильтр: <strong>{filter}</strong></span>}
                    </p>
                </div>

                {/* Список отфильтрованных игр */}
                <div className="games-grid">
                    {filteredGames.length === 0 ? (
                        <div style={{
                            textAlign: "center", 
                            padding: "40px",
                            color: "#8f98a0",
                            gridColumn: "1 / -1"
                        }}>
                            <h3>Игры не найдены</h3>
                            <p>Попробуйте выбрать другой жанр</p>
                        </div>
                    ) : (
                        filteredGames.map(game => {
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
                        })
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default GamesPage;