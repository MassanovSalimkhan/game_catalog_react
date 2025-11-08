import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PreordersPage() {
  const dispatch = useDispatch();
  const { items, loading, booking, error } = useSelector((state) => state.preorders);

  // Thunk для загрузки предзаказов
  const fetchPreorders = () => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_PREORDERS_START' });
      
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await res.json();
        
        // Преобразуем данные под наши игры
        const preorders = data.map((item, index) => ({
          id: item.id,
          title: `Игра ${index + 1}: ${item.title}`,
          price: [1999, 2499, 2999, 3499, 3999][index],
          releaseDate: "2024-12-01",
          body: item.body
        }));
        
        dispatch({ type: 'FETCH_PREORDERS_SUCCESS', payload: preorders });
      } catch (error) {
        dispatch({ type: 'FETCH_PREORDERS_ERROR', payload: 'Ошибка загрузки' });
      }
    };
  };

  // Thunk для бронирования предзаказа
  const bookPreorder = (gameId) => {
    return async (dispatch) => {
      dispatch({ type: 'BOOK_PREORDER_START' });
      
      try {
        // Имитация запроса к API
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'BOOK_PREORDER_SUCCESS', payload: gameId });
      } catch (error) {
        dispatch({ type: 'BOOK_PREORDER_ERROR', payload: 'Ошибка бронирования' });
      }
    };
  };

  useEffect(() => {
    dispatch(fetchPreorders());
  }, [dispatch]);

  if (loading) return <p>Загрузка игр для предзаказа...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Предзаказ игр</h2>
      <ul>
        {items.map((game) => (
          <li
            key={game.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              background: game.booked ? "#e0ffe0" : "#fff",
            }}
          >
            <h3>{game.title}</h3>
            <p>{game.body?.slice(0, 70)}...</p>
            <p>Цена: {game.price} руб.</p>
            <p>Выход: {game.releaseDate}</p>
            <button
              onClick={() => dispatch(bookPreorder(game.id))}
              disabled={game.booked || booking}
              style={{
                background: game.booked ? "gray" : "#4caf50",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: game.booked ? "not-allowed" : "pointer",
              }}
            >
              {game.booked
                ? "Предзаказ оформлен"
                : booking
                ? "Бронируем..."
                : "Оформить предзаказ"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}