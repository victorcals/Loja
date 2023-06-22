import React, { useState, useEffect } from 'react';
import api from '../../services/api'

export default function EditarCliente({ clienteId }) {
    const [cliente, setCliente] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        cpf: '',
        cartaoCredito: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        // Carregar os dados do cliente a partir do backend
        const carregarCliente = async () => {
            try {
                const response = await api.get(`/clientes/${clienteId}`);
                const data = response.data;
                setCliente(data);
            } catch (error) {
                console.error('Erro ao carregar cliente:', error);
            }
        };

        carregarCliente();
    }, [clienteId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.put(`/clientes/${clienteId}`, cliente);
            console.log(response.data);
            alert('Dados do cliente atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            alert('Ocorreu um erro ao atualizar os dados do cliente. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className="container">
            <h1>Editar Dados do Cliente</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        className="form-control"
                        name="telefone"
                        value={cliente.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                        type="text"
                        id="endereco"
                        className="form-control"
                        name="endereco"
                        value={cliente.endereco}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        className="form-control"
                        name="cpf"
                        value={cliente.cpf}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cartaoCredito">Número Cartão:</label>
                    <input
                        type="text"
                        id="cartaoCredito"
                        className="form-control"
                        name="cartaoCredito"
                        value={cliente.cartaoCredito}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        className="form-control"
                        name="senha"
                        value={cliente.senha}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Atualizar</button>
            </form>
        </div>
    );
}
