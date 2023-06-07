import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

function About() {
    const { name } = useParams()
    return (
        < div class="container" >
            <h1>Ola usuário {name} </h1>



            <h3>O Nyx-Filmes é um serviço de streaming por assinatura que permite assistir a séries e filmes em um aparelho conectado à internet.</h3>
            {/* <Footer /> */}
        </div >
    )
}

export default About;