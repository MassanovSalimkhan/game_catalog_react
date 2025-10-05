import { types } from "../types";

const initialState = {
  games: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case types.TOGGLE_LIKE:
      return {
        ...state,
        games: state.games.map(game =>
          game.id === action.payload ? { ...game, liked: !game.liked } : game
        )
      };
    default:
      return state;
  }
}