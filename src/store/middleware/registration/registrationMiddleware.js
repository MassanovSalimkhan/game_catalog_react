const registrationMiddleware = (store) => (next) => (action) => {
  if (action.type === "REGISTER") {
    const existingUser = store
      .getState()
      .auth.users.find((u) => u.email === action.payload.email);

    if (existingUser) {
      alert("Такой пользователь уже есть!");
      return;
    } else {
      alert("Регистрация прошла успешно");
    }
  }

  return next(action);
};

export default registrationMiddleware;