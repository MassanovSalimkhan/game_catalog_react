import React, { useState } from "react";
import { useDispatch } from "react-redux";

function RegisterPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = () => {
    dispatch({ type: "REGISTER", payload: { email, username } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Регистрация пользователя</h2>
      <input
        type="text"
        placeholder="Имя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      />
      <br />
      <input
        type="email"
        placeholder="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      />
      <br />
      <button 
        onClick={handleRegister}
        style={{ margin: "10px", padding: "8px 16px" }}
      >
        Регистрация
      </button>
    </div>
  );
}

export default RegisterPage;