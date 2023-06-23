import React, { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import { Container, OrderByContainer } from "../../components/ComponentsStyle/styleProduc";



function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('titulo');
    const [orderDirection, setOrderDirection] = useState('asc');


    useEffect(() => {
        api.get('/product')
            .then(response => response.data)
            .then(data => {
                const updatedProducts = data.map(produto => {
                    const imageData = arrayBufferToBase64(produto.image.data);
                    return { ...produto, image: imageData };
                });
                setProducts(updatedProducts);
            })
            .catch(err => console.error(err));
    }, []);

    if (!products) {
        return <p>Carregando...</p>;
    }

    const handleOrderByChange = event => {
        const [newOrderBy, newOrderDirection] = event.target.value.split(',');
        setOrderBy(newOrderBy);
        setOrderDirection(newOrderDirection);
    };

    const compareProdutos = (a, b) => {
        let comparison = 0;
        if (orderBy === 'titulo') {
            comparison = a.nome.localeCompare(b.nome);
        } else if (orderBy === 'preco') {
            comparison = parseFloat(a.preco) - parseFloat(b.preco);
        }
        if (orderDirection === 'desc') {
            comparison *= -1;
        }
        return comparison;
    };

    const sortedProducts = [...products].sort(compareProdutos);

    const handleSearchInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    };

    return (
        <Container>
            <h1>Loja Apple</h1>
            <h3>Compre os itens abaixo</h3>
            <div className="d-flex justify-content-between mr-md-1">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="search">Pesquisar:</label>
                        <input
                            type="text"
                            id="search"
                            className="form-control"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="form-group">
                        <label htmlFor="orderby">Ordenar por:</label>
                        <select
                            id="orderby"
                            className="form-control"
                            value={`${orderBy},${orderDirection}`}
                            onChange={handleOrderByChange}
                        >
                            <option value="titulo,asc">nome (A-Z)</option>
                            <option value="titulo,desc">Nome (Z-A)</option>
                            <option value="preco,asc">Preço (Menor)</option>
                            <option value="preco,desc">Preço (Maior)</option>
                        </select>
                    </div>
                </div>
            </div>

            {sortedProducts
                .filter(produto => produto.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(produto => (
                    <div className="col-md-4">
                    <Link to={`/detalhes/${produto.codigo}`} key={produto.codigo}>
                    <div className="card">
                    <img src={`data:image/png;base64,${produto.image}`} alt={produto.nome} className="card-img-top" />
                    <div className="card-body">
                    <h5 className="card-title">{produto.nome} </h5>
                    <p><b>Preço:</b>R$ {produto.preco}</p>
                    </div>
                    </div>
                    </Link>
                    </div>
                ))}
        </Container>
    );
}

export default Home;


                        