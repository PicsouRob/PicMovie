import { favToggleType } from "../Type";

const stateInnicial = {
  favoriteFilm: [],
};

function FavToggle(state = stateInnicial, action) {
  let nextState;
  switch (action.type) {
    case favToggleType:
      const favFilmIndex = state.favoriteFilm.findIndex((item) => item.id === action.value.id);
      if (favFilmIndex !== -1) {
        return {
          ...state,
          favoriteFilm: state.favoriteFilm.filter((item, index) => index !== favFilmIndex),
        };
      } else {
        return {
          ...state,
          favoriteFilm: [...state.favoriteFilm, action.value],
        };
      }
    default:
      return state || nextState;
  }
}

export default FavToggle;
