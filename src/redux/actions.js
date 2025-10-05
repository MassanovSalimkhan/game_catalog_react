import { types } from "./types";
import gamesData from '../data/games.json';

export const toggleLikeAction = (gameId) => ({
  type: types.TOGGLE_LIKE,
  payload: gameId
});

export const loadGamesAction = () => {
  console.log('Loading games data:', gamesData); 
  return {
    type: types.LOAD_GAMES,
    payload: gamesData
  };
};