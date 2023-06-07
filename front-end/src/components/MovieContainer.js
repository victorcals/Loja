import React, { useEffect, useState } from "react";
import { Container, MovieList } from "../components/Style/styles";
import { Link } from "react-router-dom";
import { Movie } from "../components/Style/styleMovie";
function MovieContainer({ movies, orderBy, handleOrderBy }) {
  const sortedMovies = [...movies].sort((a, b) =>
    a[orderBy].localeCompare(b[orderBy])
  );

  return (
    <div>
      <div>
        <label>Ordenar por:</label>
        <select id="orderBy" value={orderBy} onChange={handleOrderBy}>
          <option value="titulo">Título</option>
          <option value="ano">Ano</option>
          <option value="diretor">Diretor</option>
        </select>
      </div>
      <MovieList>
        {sortedMovies.map((movie) => {
          return (
            <Movie key={movie.id}>
              <Link to={`/details/${movie.id}`}>
                <img src={`${movie.poster}`} alt={movie.titulo} />
              </Link>
              <span>{movie.titulo}</span>
            </Movie>
          );
        })}
      </MovieList>
    </div>
  );
}
export default MovieContainer;