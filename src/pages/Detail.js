import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeAction, loadGamesAction } from "../redux/actions";

function Detail(){
    const {id} = useParams();
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const game = games.find(game => game.id === parseInt(id));

    useEffect(() => {
        if (games.length === 0) {
            dispatch(loadGamesAction());
        }
    }, [games.length, dispatch]);

    if(!game) return <div className="loading">Загрузка......</div>

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
                            Статус: {game.liked ? 'В избранном' : 'Не в избранном'}
                        </p>
                    </div>

                    <div className="detail-actions">
                        <button
                            className={game.liked ? "detail-like-btn liked" : "detail-like-btn"}
                            onClick={() => dispatch(toggleLikeAction(game.id))}
                        >
                            {game.liked ? "Убрать из избранного" : "Добавить в избранное"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;