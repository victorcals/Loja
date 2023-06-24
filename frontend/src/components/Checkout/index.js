import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

export default function Checkout() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para armazenar os produtos selecionados

  async function fetchUserData() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const data = jwt(storedToken);
        const response = await fetch(`http://localhost:3001/clientes/${data.codigo}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    } else {
      alert('Usuário não autenticado! Por favor, faça o login!');
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchUserData();
    // Recuperar os produtos selecionados do localStorage
    const storedProducts = localStorage.getItem("selectedProducts");
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const data = jwt(storedToken);
        alert("Compra efetuada com sucesso para o cliente código: " + data.codigo + ".");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Usuário não autenticado! Por favor, faça o login!');
      navigate("/login");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <h3 className="p-3">Produtos selecionados:</h3>
            <table className="table table-sm custom-table border">
              <thead>
                <tr>
                  <th scope="col">Tipo do Produto</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.nome}</td>
                    <td>{product.preco}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h3 className="p-3">Dados do usuário:</h3>
            <div className="row border">
              <div className="col-md-6">
                <div className="form-group mt-2">
                  <label htmlFor="endereco">Endereço:</label>
                  <input type="text" id="endereco" value={userData.endereco} className="form-control" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="nome-cartao">Nome do cartão:</label>
                  <input type="text" id="nome-cartao" value={userData.nomeCartao} className="form-control" disabled />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mt-2">
                  <label htmlFor="numero-cartao">Número do cartão:</label>
                  <input type="text" id="numero-cartao" value={userData.cartaoCredito} className="form-control" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="cvc">CVC:</label>
                  <input type="password" id="cvc" value={userData.cvc} className="form-control" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Finalizar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
