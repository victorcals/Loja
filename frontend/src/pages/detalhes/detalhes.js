import React, { useState, useEffect } from 'react';
import Title from '../../components/Title/index';
import { useParams } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';
import '../detalhes/style.css';
import { FaStar } from 'react-icons/fa';

export default function Detalhes() {
  const { id } = useParams(); // Extrai o ID do produto da URL
  const [product, setProduct] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [categorys, setCategory] = useState([]);

  // Busca o produto
  useEffect(() => {
    api.get(`/product/${id}`)
      .then(response => {
        const produto = response.data;
        const imageData = arrayBufferToBase64(produto.image.data);
        const updatedProduct = { ...produto, image: imageData };
        setProduct(updatedProduct);
      })
      .catch(err => console.error(err));
  }, [id]);

  //busca os comentarios 
  useEffect(() => {
    api.get('/comentarios/')
      .then(response => {
        const comentarios = response.data;
        setComentarios(comentarios);
      })
      .catch(err => console.error(err));
  }, []);
  
  //busca os category
  useEffect(() => {
    api.get('/category/')
      .then(response => {
        const categorys = response.data;
        setCategory(categorys);
      })
      .catch(err => console.error(err));
  }, []);

  // Altera a imagem
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };


  // Caso não ache o produto
  if (!product) {
    return (
      <div className="p-3 mb-2 bg-danger text-white">
        <p className="text-center">Desculpe, não foi possível encontrar os detalhes do produto. Tente novamente mais tarde!</p>
      </div>
    );
  }

  return (
    <div>
      <Title title={"Detalhes"} text="" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={`data:image/png;base64,${product.image}`} alt={product.nome} className="produto-imagem" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <p className="text-left"><b>Nome:</b> {product.nome}</p>
                {categorys.map(catego => {
                  if (catego._id == product.category) {
                    return (
                      <p className="text-left"><b>Categoria: </b> {catego.nome} </p>
                    );
                  }
                })}
                <p className="text-left"><b>Preço:</b> R$: {product.preco}</p>
                <p className="text-left"><b>Detalhes do produto:</b> {product.descricao}</p>
                <button type="submit" className="btn btn-primary mt-5">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Lista os comentarios */}
      <div className="d-flex flex-column align-items-center">
        <h2 className="mt-5">Comentários</h2>
        <ul className="list-group">
          {comentarios.map(comentario => {
            if (comentario.product === product._id) {
              return (
                <li key={comentario.id} className="list-group-item">
                  <p>{comentario.comentario} Nota: {comentario.nota}</p>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
        {/* faz a conta das notas e mostra */}
        <p className="mt-3"> <FaStar style={{ color: 'yellow' }} /> O produto tem nota: {comentarios.reduce((acc, comentario) => comentario.product === product._id ? acc + +comentario.nota : acc, 0)}
        </p>
      </div>

    </div>
  );
}
