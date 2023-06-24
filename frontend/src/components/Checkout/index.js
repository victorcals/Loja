import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

export default function Checkout() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({}); // Declare userData state variable

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  async function fetchUserData() {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        //Busca dados do usuario no banco
        const data = jwt(storedToken);
        const response = await fetch(`http://localhost:3001/clientes/${data.codigo}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        const userData = await response.json();
        console.log(userData);
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
  }, []); 

   //valida se esta logado ou não
  function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const data = jwt(storedToken);
        console.log(data);
        alert("Compra efetuada com sucesso para o cliente código: " + data.codigo + ".");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Usuário não autenticado! Por favor, faça o login!');
      navigate("/login");
    }
  }

   // Recupera os dados do LocalStorage ao carregar a página
   useEffect(() => {
    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);


  // Função para adicionar um novo produto
  const adicionarProduto = (produto) => {
    const novosProdutos = [...products, produto];
    setProducts(novosProdutos);
    localStorage.setItem('products', JSON.stringify(novosProdutos));
  };

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
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.tipo}</td>
              <td>{product.quantidade}</td>
              <td>{product.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Restante do seu código... */}
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
