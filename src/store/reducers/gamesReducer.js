const initialState = {
  items: [],   
  loading: false
};

export default function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_GAMES':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, liked: !item.liked } : item
        )
      };
    default:
      return state;
  }
}