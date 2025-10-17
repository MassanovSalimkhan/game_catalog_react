import { createStore, combineReducers } from 'redux';
import gamesReducer from './reducers/gamesReducer';
import favoritesReducer from './reducers/favoritesReducer';
import gamesData from '../data/games.json';

const rootReducer = combineReducers({
  games: gamesReducer,
  favorites: favoritesReducer,
})

const initialState = {
  games: {
    items: gamesData,      
    loading: false,
  },
  favorites: {
    list: []            
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);