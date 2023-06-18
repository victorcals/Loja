import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Fina } from "./style";

// import comentarios from '../../components/Comments/index';
// import Assistido from "../../components/Button/assistido";

function Details() {

    const { codigo } = useParams();
    const [movies, setMovies] = useState({});
    const [movie, setMovie] = useState({});
    const [data, setData] = useState(false);
    const [notFound, setNotFound] = useState(false);



    useEffect(() => {
        fetch(`http://localhost:3000/product/${codigo}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setNotFound(true);
                } else {
                    setMovies(data);
                    setData(true);
                }

            });
    }, [codigo]);

    // useEffect(() => {
    //     fetch(`https://my-json-server.typicode.com/marycamila184/movies/movies/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.error) {
    //                 setMovie(undefined);
    //             } else {
    //                 setMovie(data);
    //                 setData(true);
    //             }
    //         });
    // }, [id]);


    if (!data) {
        return <p>Carregando...</p>;
    }
    if (!movies.id || notFound) {
        return (
            <>
                <p>Produto não encontrado.</p>
                <Link to="/">
                    <button variant="primary">Voltar</button>
                </Link>
            </>
        );
    }


    //FUNÇÃO ASSISTIDO


    // const handleAssistidoClick = (id) => {
    //     setMovies((prevState) => ({
    //         ...prevState,
    //         assistido: !prevState.assistido
    //     }));
    // };

    return (

        <div>
            <Fina>
                <h1> Detalhes</h1>
            </Fina>
            {movies ? (
                <Container>
                    <div className="movies">
                        <img src={movies.nome} alt={movies.nome} />
                        <div className="details">
                            <h1>Título: {movies.nome}</h1>
                            <span> Ano: {movies.nome}</span>
                            <span> Ano: {movie.nome}</span>
                            <span> Sinopse: {movies.nome}</span>




                            {/* <Assistido
                                assistido={movies.assistido}
                                onClick={handleAssistidoClick}
                                id={movies.id}
                            /> */}




                            <Link to="/">
                                <button variant="primary">Voltar</button>
                            </Link>
                        </div>
                    </div>
                    {/* <Fina>
                        <div>
                            <h2>Comentários:</h2>
                            {comentarios.length > 0 ? (
                                comentarios.map((comentario) => {
                                    if (comentario.id_filme === movies.id) {
                                        return (
                                            <div key={comentario.id}>
                                                <p>
                                                    <strong>{comentario.usuario}:</strong>{" "}
                                                    {comentario.texto}
                                                </p>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <p>Sem comentários para esse filme.</p>
                            )}
                        </div>
                    </Fina> */}
                </Container>
            ) : (
                <p>Filme não encontrado.</p>
            )}
        </div>
    );
}

export default Details;




// <div>
// <Container>
//     <div className="movies">



//         <img src={movies.poster} alt={movies.titulo} />

//         <div className="details">
//             <h1>Título original: {movies.titulo}</h1>
//             <span> Ano: {movies.ano}</span>
//             <span> Nota: {movies.nota}</span>
//             <span> Direção: Jon Favreau  Roteiro   </span>
//             <span> Roteiro: Matt Holloway, Mark Fergus</span>
//             <Assistido
//                 assistido={movies.assistido}
//                 onClick={handleAssistidoClick}
//                 id={movies.id}
//             />
//             <Link to="/">
//                 <button variant="primary">Voltar</button>
//             </Link>
//         </div>

//         <div>
//             <h2>Comentários:</h2>
//             {comentarios.length > 0 ? (
//                 comentarios.map((comentario) => (
//                     <div key={comentario.id}>
//                         <p>
//                             <strong>{comentario.usuario}:</strong> {comentario.texto}
//                         </p>
//                     </div>
//                 ))
//             ) : (
//                 <p>Sem comentários para esse filme.</p>
//             )}
//         </div>
//     </div>
// </Container>
// </div>