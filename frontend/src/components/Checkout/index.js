import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'



export default function Checkout() {

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const data = jwt(storedToken)
                console.log(data)
                alert("Compra efetuada com sucesso para o cliente codigo: " + data.codigo + ".")
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Usuario não autenticado! Por favor fazer o login!')
            navigate("/login");
        }
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 ">             
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
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    <tr>
                    <td>tesste</td>
                    <td>tesste</td>
                    <td>tesste</td>
                    </tr>
                    
                  </tbody>
                </table>
             
            </div>
            <div className="col-md-6 ">
              <h3 className="p-3">Dados do usuário:</h3>
              <div className="row border">
                <div className="col-md-6">
                  <div className="form-group mt-2">
                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" id="endereco" className="form-control" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nome-cartao">Nome do cartão:</label>
                    <input type="text" id="nome-cartao" className="form-control" disabled />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mt-2">
                    <label htmlFor="numero-cartao">Número do cartão:</label>
                    <input type="text" id="numero-cartao" className="form-control" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvc">CVC:</label>
                    <input type="text" id="cvc" className="form-control" disabled />
                  </div><br />
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