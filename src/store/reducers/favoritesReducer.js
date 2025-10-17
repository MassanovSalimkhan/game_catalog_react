const initialState = {
  list: []
};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (!state.list.find(item => item.id === action.payload.id)) {
        return {
          ...state,
          list: [...state.list, action.payload]
        };
      }
      return state;
      
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}