import React, { useState, useEffect } from 'react';
import Title from '../../components/Title/index';
import { useParams } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';
import '../detalhes/style.css';

export default function Detalhes() {
  const { id } = useParams(); // Extrai o ID do produto da URL
  const [product, setProduct] = useState(null);
  // const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  // const [comment, setComment] = useState('');

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

  // Altera a imagem
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  // Manipuladores de eventos do modal
  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const handleCommentChange = (event) => {
  //   setComment(event.target.value);
  // };

  // const handleAddComment = () => {
  //   // Lógica para adicionar o comentário ao produto
  //   // Aqui você pode usar a API para enviar o comentário para o backend
  //   // Após adicionar o comentário, atualize o estado do produto com o novo comentário
  //   // e feche o modal

  //   // Exemplo simplificado de adição de comentário
  //   const updatedProduct = { ...product, comentarios: [...product.comentarios, comment] };
  //   setProduct(updatedProduct);
  //   setShowModal(false);
  // };

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
                <p className="text-left"><b>Categoria:</b> {product.category}</p>
                <p className="text-left"><b>Preço:</b> R$: {product.preco}</p>
                <p className="text-left"><b>Detalhes do produto:</b> {product.descricao}</p>
        
                <button type="submit" className="btn btn-primary mt-5">
                  Adicionar ao carrinho
                </button>
                {/* <button type="button" className="btn btn-primary mt-3" onClick={handleOpenModal}>
                  Adicionar Comentário
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
          <label className=""><b>Comentários:</b> </label>
          {product.comments.map((comment, index) => (
             <div key={index}>
              <p className="mt-3">Comentário: {comment.text}</p>
              <p className="mt-3">Nota: {comment.rating}</p>
            </div>
  ))}
</div>
 
      

      {/* <div className="mt-5">
        <label className=""><b>Comentários:</b> </label>
        {product.comentarios.map((comentario, index) => (
          <p className="mt-3" key={index}>{comentario}</p>
        ))}
      </div> */}

      {/* Modal de Adicionar Comentário */}
      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Comentário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Comentário:</label>
          <textarea className="form-control" value={comment} onChange={handleCommentChange}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddComment}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
