import { createStore, combineReducers, applyMiddleware } from 'redux';
import gamesReducer from './reducers/gamesReducer';
import favoritesReducer from './reducers/favoritesReducer';
import authReducer from './reducers/authReducer';
import registrationMiddleware from './middleware/registration/registrationMiddleware';
import authMiddleware from './middleware/authMiddleware';
import gamesData from '../data/games.json';

const rootReducer = combineReducers({
  games: gamesReducer,
  favorites: favoritesReducer,
  auth: authReducer,
});

const initialState = {
  games: {
    items: gamesData,
    loading: false,
  },
  favorites: {
    list: []            
  },
  auth: {
    users: [],
    currentUser: null,
    isAuthenticated: false
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(registrationMiddleware, authMiddleware)
);