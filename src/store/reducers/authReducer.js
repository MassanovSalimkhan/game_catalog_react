const initialState = {
  users: [],
  currentUser: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}