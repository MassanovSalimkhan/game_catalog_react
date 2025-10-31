const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "LOGIN") {
    setTimeout(() => {
      window.location.href = '/games';
    }, 500);
  }
  return next(action);
};

export default authMiddleware;