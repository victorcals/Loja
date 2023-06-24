import React, { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import { Container, OrderByContainer, ProductsList } from "../../components/ComponentsStyle/styleProduc";
import { Row, Col } from 'react-bootstrap';
function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('titulo');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    api.get('/category')
      .then(response => {
        const categories = response.data;
        setCategories(categories);
        if (categories.length > 0) {
          setActiveCategory(categories[0]._id);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/product', { params: { category: activeCategory } })
      .then(response => response.data)
      .then(data => {
        const updatedProducts = data.map(product => {
          const imageData = arrayBufferToBase64(product.image.data);
          return { ...product, image: imageData };
        });
        setProducts(updatedProducts);
      })
      .catch(err => console.error(err));
  }, [activeCategory]);

  if (!products) {
    return <p>Carregando...</p>;
  }

  const handleOrderByChange = event => {
    const [newOrderBy, newOrderDirection] = event.target.value.split(',');
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
  };

  const compareProducts = (a, b) => {
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

  const sortedProducts = [...products].sort(compareProducts);

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  

  

  const renderProductsByCategory = () => {
    return (
      <div className="category-container mt-3">
        {categories.map(category => (
          <Row key={category._id}>
            <h2 className="mt-5">{category.nome}</h2>
            <Col className="mr-5">
              <div className="products-container">
                <Row>
                  {sortedProducts
                    .filter(product => product.category === category._id)
                    .filter(product => product.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(product => (
                      <Col key={product.codigo} xs={12} sm={6} md={4} lg={3}>
                        <div className="card text-white bg-dark mb-3">
                          <Link to={`/detalhes/${product.codigo}`} style={{ textDecoration: 'none' }}>
                            <img src={`data:image/png;base64,${product.image}`} alt={product.nome} className="card-img-top" style={{ height: 350, width: 350 }} />
                            <div className="card-body">
                              <h5 className="card-title" style={{ color: "white" }}>{product.nome}</h5>
                              <p><b style={{ color: "white" }}>R$ {product.preco}</b></p>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
  
  
  

  return (
    <Container>
      <h1>Pet Shop</h1>

      <OrderByContainer>
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
                <option value="titulo,asc">Nome (A-Z)</option>
                <option value="titulo,desc">Nome (Z-A)</option>
                <option value="preco,asc">Preço (Menor)</option>
                <option value="preco,desc">Preço (Maior)</option>
              </select>
            </div>
          </div>
        </div>
      </OrderByContainer>

      <ProductsList>
        {renderProductsByCategory()}
      </ProductsList>
    </Container>
  );
}

export default Home;
