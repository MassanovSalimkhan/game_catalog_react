import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Detail(){
    const {id} = useParams();
    const games = useSelector((state) => state.games.items || []);
    const favorites = useSelector((state) => state.favorites.list || []);
    const dispatch = useDispatch();
    const game = games.find(game => game.id === parseInt(id));

    if(!game) return <div className="loading">Игра не найдена</div>

    const isInFavorites = favorites.some(item => item.id === game.id);
    const isLiked = game.liked || isInFavorites;

    const toggleFavorite = () => {
        if (isLiked) {
            dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: game.id });
            dispatch({ type: 'TOGGLE_LIKE', payload: game.id });
        } else {
            dispatch({ type: 'ADD_TO_FAVORITES', payload: game });
            dispatch({ type: 'TOGGLE_LIKE', payload: game.id });
        }
    };

    return(
        <div className="game-detail">
            <Link to="/games" className="back-link">← Назад к каталогу</Link>
            <div className="detail-content">
                <img src={game.img} alt={game.title} className="detail-image" />
                
                <div className="detail-info">
                    <h1>{game.title}</h1>
                    
                    <div className="detail-meta">
                        <p className="detail-genre">Жанр: {game.genre}</p>
                        <p className="detail-rating">Рейтинг: ★ {game.rating}</p>
                        <p className="detail-status">
                            Статус: {isLiked ? 'В избранном' : 'Не в избранном'}
                        </p>
                    </div>

                    <div className="detail-actions">
                        <button
                            className={isLiked ? "detail-like-btn liked" : "detail-like-btn"}
                            onClick={toggleFavorite}
                        >
                            {isLiked ? "Удалить из избранного" : "Добавить в избранное"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;