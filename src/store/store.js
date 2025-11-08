import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ← ИСПРАВИЛ НА { thunk }
import gamesReducer from './reducers/gamesReducer';
import favoritesReducer from './reducers/favoritesReducer';
import authReducer from './reducers/authReducer';
import preordersReducer from './reducers/preordersReducer';
import registrationMiddleware from './middleware/registration/registrationMiddleware';
import authMiddleware from './middleware/authMiddleware';
import gamesData from '../data/games.json';

const rootReducer = combineReducers({
  games: gamesReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  preorders: preordersReducer,
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
    currentUser: null
  },
  preorders: {
    items: [],
    loading: false,
    booking: false,
    error: null
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, registrationMiddleware, authMiddleware)
);