import { Movie } from "../../components/Style/styleMovie";
import { Container, MovieList, OrderByContainer } from "../../components/Style/styles";
import { useState } from "react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Assistido from "../../components/Button/assistido";

function Home() {
    const [data, setData] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [orderBy, setOrderBy] = useState('titulo');
    const [orderDirection, setOrderDirection] = useState('asc');

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/marycamila184/movies/movies')
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    setMovies(undefined);
                } else {
                    setMovies(data);
                    setData(true);
                }
            });
    }, []);



    if (!data) {
        return <p>Carregando...</p>;
    }

    const handleOrderByChange = (event) => {
        const [newOrderBy, newOrderDirection] = event.target.value.split(',');
        setOrderBy(newOrderBy);
        setOrderDirection(newOrderDirection);
    };

    const compareMovies = (a, b) => {
        let comparison = 0;
        if (orderBy === 'titulo') {
            comparison = a.titulo.localeCompare(b.titulo);
        } else if (orderBy === 'ano') {
            comparison = a.ano - b.ano;
        } else if (orderBy === 'nota') {
            comparison = a.nota - b.nota;
        }
        if (orderDirection === 'desc') {
            comparison *= -1;
        }
        return comparison;
    };

    const sortedMovies = [...movies].sort(compareMovies);

    const handleAssistidoClick = (id) => {
        setMovies(
            movies.map((movie) =>
                movie.id === id ? { ...movie, assistido: !movie.assistido } : movie
            )
        );
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Container>
            <h1>Filmes</h1>
            <OrderByContainer>
                <div className="d-flex justify-content-between mr-md-1">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="search">Pesquisar:</label>
                            <input type="text" id="search" className="form-control" value={searchTerm} onChange={handleSearchInputChange} />
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label htmlFor="orderby">Ordenar por:</label>
                            <select id="orderby" className="form-control" value={`${orderBy},${orderDirection}`} onChange={handleOrderByChange}>
                                <option value="titulo,asc">Título (A-Z)</option>
                                <option value="titulo,desc">Título (Z-A)</option>
                                <option value="ano,asc">Ano antigo</option>
                                <option value="ano,desc">Ano recente</option>
                                <option value="nota,asc">Nota menor</option>
                                <option value="nota,desc">Nota maior</option>
                            </select>
                        </div>
                    </div>
                </div>
            </OrderByContainer>
            <MovieList>
                {sortedMovies.filter(movie => movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())).map(movie => {
                    return (
                        <Movie key={movie.id}>
                            <Link to={`/details/${movie.id}`}>
                                <img src={`${movie.poster}`} alt={movie.titulo} />
                            </Link>
                            <span>{movie.titulo}</span>
                            <span>Nota: {movie.nota}</span>
                            <Assistido
                                assistido={movie.assistido}
                                onClick={handleAssistidoClick}
                                id={movie.id}
                            />
                        </Movie>
                    );
                })}
            </MovieList>
        </Container >
    );
}

export default Home;












// return (



//     < Container >
//         <h1> Movies</h1>

//         <MovieList>



//             {
//                 movies.map(movie => {
//                     return (
//                         <Movie>
//                             <a href="https://uiverse.io/challenges/open-source-card-challenge">

//                                 <img src={movie.image_url} alt={movie.title} /></a>


//                             <span> {movie.title}</span>

//                         </Movie>
//                     )
//                 })
//             }


//         </MovieList>

//     </Container>
// )