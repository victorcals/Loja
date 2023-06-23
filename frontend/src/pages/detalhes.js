import React from 'react';
import Title from './../components/Title/index';
// import Detalhes from '../components/detalhes/detalhes';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";



export default function Detalhes() {
    const { codigo } = useParams();
    const [products, setProducts] = useState({});

    useEffect(() => {
        fetch(`/product/${codigo}`)
            .then((response) => response.json())
            .then((data) => { 
                setProducts(data)     
            });
            
    }, [codigo]);   

    if (!products.nome) {
        return <div class="p-3 mb-2 bg-danger text-white"><p  class="text-center">Desculpe, não foi possível encontrar os detalhes do filme. Tente novamente mais tarde!</p></div>
        
      }

    return (   
        <div>
            <Title
                title={"Detalhes"}
                text="" />               
            <p class='text-center'><h2>Produto: {products.nome}</h2></p>
           
                        <div class="d-flex justify-content-end">
                        <div class="d-inline-flex p-4 bd-highlight">
                        <img src={`data:image/png;base64,${products.image}`} alt={products.nome} className="card-img-top" />
                                <div class="conatiner-fluid flex border w-100 p-5">
                                    <div class="card-body">
                                    <p class='text-left'><b>Nome:</b> {products.nome}</p>
                                    <p class='text-left'><b>Preço:</b>R$: {products.preco}</p>
                                    <p class='text-left'><b>Detalhes do produto:</b> {products.descricao}</p>
                                    <div className="btn btn-primary">
                                    </div>
                                    </div>
                                </div>
                        </div>  
                        </div>   
                        {/* <p><Comments filme={filmes.titulo} /></p> */}
        </div>

    )

}