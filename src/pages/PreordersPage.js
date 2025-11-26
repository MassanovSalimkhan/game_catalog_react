import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PreordersPage() {
  const dispatch = useDispatch();
  const preorders = useSelector((state) => state.preorders);
  const bookings = preorders.bookings || [];

  const [form, setForm] = useState({
    name: '', guests: '', date: '', phone: ''
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        { id: 1, title: "Cyberpunk 2077", price: 1999, booked: false },
        { id: 2, title: "Elden Ring", price: 2499, booked: true }
      ];
      dispatch({ type: 'FETCH_PREORDERS_SUCCESS', payload: mockData });
    }, 500);
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.date || !form.phone) {
      alert("Заполните все поля!");
      return;
    }
    dispatch({ type: 'ADD_BOOKING', payload: form });
    setForm({ name: '', guests: '', date: '', phone: '' });
  }

  function handleRemove(index) {
    dispatch({ type: 'REMOVE_BOOKING', payload: index });
  }

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Бронирование игр</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name="name" placeholder="Имя" value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          style={{ margin: 5, padding: 8 }} />
        <br />
        <input name="guests" placeholder="Игроков" type="number" value={form.guests} 
          onChange={(e) => setForm({...form, guests: e.target.value})} 
          style={{ margin: 5, padding: 8 }} />
        <br />
        <input name="date" type="date" value={form.date} 
          onChange={(e) => setForm({...form, date: e.target.value})} 
          style={{ margin: 5, padding: 8 }} />
        <br />
        <input name="phone" placeholder="Телефон" value={form.phone} 
          onChange={(e) => setForm({...form, phone: e.target.value})} 
          style={{ margin: 5, padding: 8 }} />
        <br />
        <button type="submit" style={{ margin: 5, padding: '8px 16px' }}>
          Забронировать
        </button>
      </form>

      <input 
        placeholder="Найти по имени..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8 }}
      />

      <h3>Бронирования ({filteredBookings.length})</h3>
      {filteredBookings.map((booking, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
          <p><strong>{booking.name}</strong></p>
          <p>Игроков: {booking.guests}</p>
          <p>Дата: {booking.date}</p>
          <p>Телефон: {booking.phone}</p>
          <button onClick={() => handleRemove(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
            Удалить
          </button>
        </div>
      ))}

      <h3>Игры для предзаказа</h3>
      <ul>
        {preorders.items.map((game) => (
          <li key={game.id} style={{ marginBottom: 10, border: '1px solid #ddd', padding: 10 }}>
            <h4>{game.title}</h4>
            <p>Цена: {game.price} руб.</p>
            <button 
              onClick={() => dispatch({ type: 'BOOK_PREORDER_SUCCESS', payload: game.id })}
              disabled={game.booked}
              style={{ 
                background: game.booked ? 'gray' : 'green', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px' 
              }}
            >
              {game.booked ? 'Забронировано' : 'Забронировать'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}