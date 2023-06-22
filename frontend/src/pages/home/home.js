import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, OrderByContainer } from "../../components/ComponentsStyle/styleProduc";

function Home() {
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('titulo');
    const [orderDirection, setOrderDirection] = useState('asc');

    useEffect(() => {
        fetch('http://localhost:3000/product')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setProduct([]);
                } else {
                    setProduct(data);
                }
            })
            .catch(error => {
                console.error('Erro ao obter os produtos:', error);
            });
    }, []);

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

    const sortedProducts = [...product].sort(compareProdutos);

    const handleSearchInputChange = event => {
        setSearchTerm(event.target.value);
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
                    <Link to={`/detalhes/${produto.codigo}`} key={produto.codigo}>
                        <div>
                            <img src={`data:image/base64,${produto.image}`} alt={produto.nome} /><br />
                            <span>{produto.nome}</span><br />
                            <span>Preço: R$ {produto.preco}</span><br />
                            <span>animal: {produto.descricao}</span>
                        </div>
                    </Link>
                ))}
        </Container>
    );
}

export default Home;
