import { Cart1 } from "../../components/Style/styles";
import { useState } from "react";

function Cart() {
    //Faz a conta para mostra no fina/
    const [products, setProducts] = useState([
        { nome: "Produto 1", quantidade: 10, valor: 100.0 },
        { nome: "Produto 2", quantidade: 5, valor: 50.0 }
    ]);

    const calculateTotal = () => {
        return products.reduce((total, product) => {
            return total + product.quantidade * product.valor;
        }, 0);
    };

    const total = calculateTotal();

    return (
        <Cart1>
            <h1>Checkout</h1>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product">
                            <h3 className="p-3">Produtos selecionados:</h3>
                            <table className="table table-sm custom-table">
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
                                            <td>{product.nome}</td>
                                            <td>{product.quantidade}</td>
                                            <td>R$ {product.valor.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            <strong>Total:</strong>
                                        </td>
                                        <td>R$ {total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-6">

                    <h3 className="p-3">Dados do usuario:</h3>
                        <div>
                            <label htmlFor="codigo">Endereço:</label>
                            <input type="text" id="codigo" disabled/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="codigo">nome do cartão</label>
                            <input type="text" id="codigo" disabled/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="codigo">Número do cartão</label>
                            <input type="text" id="codigo" disabled/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="codigo">CVC</label>
                            <input type="text" id="codigo" disabled/>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-sm mt-5">
                        Finalizar pedido
                    </button>
                </div>
            </div>
    
        </Cart1 >
    );
}

export default Cart;
