const initialState = {
  items: [],
  loading: false,
  booking: false,
  error: null
};

export default function preordersReducer(state = initialState, action) {
  switch (action.type) {
    // Загрузка предзаказов
    case 'FETCH_PREORDERS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PREORDERS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        items: action.payload.map(item => ({ ...item, booked: false }))
      };
    case 'FETCH_PREORDERS_ERROR':
      return { ...state, loading: false, error: action.payload };

    // Бронирование предзаказа
    case 'BOOK_PREORDER_START':
      return { ...state, booking: true, error: null };
    case 'BOOK_PREORDER_SUCCESS':
      return {
        ...state,
        booking: false,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, booked: true } : item
        )
      };
    case 'BOOK_PREORDER_ERROR':
      return { ...state, booking: false, error: action.payload };

    default:
      return state;
  }
}