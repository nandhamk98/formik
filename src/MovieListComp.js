import { MovieComponent } from "./MovieComponent";
import { useState, useEffect } from "react";
import { API } from "./global";

function MovieList() {
  const [movies, setMovies] = useState([]);

  const deleteMovie = (id) => {
    fetch(`${API}/movies` + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log("success");
      })
      .then(() => getMovie());
  };

  const getMovie = () => {
    fetch(`${API}/movies`)
      .then((data) => data.json())
      .then((mvs) => {
        console.log(mvs);
        setMovies(mvs);
      });
  };

  useEffect(getMovie, []);

  return (
    <div className="movieList">
      {movies.map((movie, index) => (
        <MovieComponent
          poster={movie.poster}
          name={movie.name}
          rating={movie.rating}
          description={movie.summary}
          key={index}
          id={movie.id}
          movies={movies}
          setMovies={setMovies}
          deleteMovie={deleteMovie}
        />
      ))}
    </div>
  );
}

export { MovieList };
