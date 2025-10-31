import React, { useState } from "react";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch({ type: "LOGIN", payload: { username } });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Авторизация</h2>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите имя"
          style={{ margin: "10px", padding: "8px" }}
        />
        <br />
        <button 
          type="submit"
          style={{ margin: "10px", padding: "8px 16px" }}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default LoginPage;