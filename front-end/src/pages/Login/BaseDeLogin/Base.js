

import React, { useState } from 'react';
import './base.css'
function AdmCadastro() {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [animal, setAnimal] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [category, setCategory] = useState('');

    function handleCodigoChange(event) {
        setCodigo(event.target.value);
    }

    function handleNomeChange(event) {
        setNome(event.target.value);
    }

    function handleDescricaoChange(event) {
        setDescricao(event.target.value);
    }

    function handlePrecoChange(event) {
        setPreco(event.target.value);
    }

    function handleAnimalChange(event) {
        setAnimal(event.target.value);
    }

    function handleComentariosChange(event) {
        setComentarios(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleProdutoSubmit(event) {
        event.preventDefault();

        const novoProduto = {
            codigo,
            nome,
            descricao,
            preco,
            animal,
            comentarios,
            category,
        };


        fetch('localhoss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto),
        })
            .then(response => response.json())
            .then(data => {

                console.log('Produto cadastrado com sucesso!', data);
            })
            .catch(error => {

                console.error('Ocorreu um erro ao cadastrar o produto:', error);
            });


        setCodigo('');
        setNome('');
        setDescricao('');
        setPreco('');
        setAnimal('');
        setComentarios('');
        setCategory('');
    }





    return (



        <div className="form-container">
            <div className="form-section">
                <h2>Cadastro de Produto</h2>
                <form onSubmit={handleProdutoSubmit}>
                    <div>
                        <label htmlFor="codigo">Código:</label>
                        <input type="text" id="codigo" value={codigo} onChange={handleCodigoChange} />
                    </div>
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" value={nome} onChange={handleNomeChange} />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea id="descricao" value={descricao} onChange={handleDescricaoChange} />
                    </div>
                    <div>
                        <label htmlFor="preco">Preço:</label>
                        <input type="text" id="preco" value={preco} onChange={handlePrecoChange} />
                    </div>
                    <div>
                        <label htmlFor="animal">Animal:</label>
                        <input type="text" id="animal" value={animal} onChange={handleAnimalChange} />
                    </div>
                    <div>
                        <label htmlFor="comentarios">Comentários:</label>
                        <textarea id="comentarios" value={comentarios} onChange={handleComentariosChange} />
                    </div>
                    <div>
                        <label htmlFor="category">Categoria:</label>
                        <input type="text" id="category" value={category} onChange={handleCategoryChange} />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
            <div className="form-section">
                <h2>Cadastro de Cliente</h2>
                <form onSubmit={handleClienteSubmit}>
                    <div>
                        <label htmlFor="codigoCliente">Código do Cliente:</label>
                        <input type="text" id="codigoCliente" value={codigoCliente} onChange={(e) => setCodigoCliente(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="nomeCliente">Nome do Cliente:</label>
                        <input type="text" id="nomeCliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
                    </div>


 
                    {/* CRIAR AS COISAS DO CLIENTE */}



                    <button type="submit">Cadastrar Cliente</button>
                </form>
            </div>
        </div>


    );
}

export default AdmCadastro;
