import { API_KEY } from "../Helpers/Api_key";

export function getSearchFilm(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
}

// Récupération du détail d'un film
export function getFilmDetailFromApi(id) {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=" +
      API_KEY +
      "&append_to_response=videos,images,credits&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageApi(name) {
  return "https://image.tmdb.org/t/p/w500" + name;
}

export function getNewFilmFromApi(page) {
  // let url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=" + page;
  let url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&primary_release_date=2021&language=fr&page=" + page;
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error));
}

export function getPopularMovies(page) {
  return fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&sort_by=popularity.desc&language=fr&page=" + page)
  .then((response) => response.json())
  .catch((error) => console.log(error));
}

export function getTopRAtedMovies(page) {
  return fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&sort_by=revenue.desc&language=fr&page=" + page)
  .then((response) => response.json())
  .catch((error) => console.log(error));
}