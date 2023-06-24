import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function EdicaoCliente() {
    const { id } = useParams();

    const [cliente, setCliente] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        cpf: '',
        nomeCartao: '',
        cvc: '',
        cartaoCredito: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        const carregarCliente = async () => {
            try {
                const response = await api.get(`/clientes/${id} `);
                const clienteData = response.data;

                setCliente(clienteData);
            } catch (error) {
                console.error(error);
            }
        };
        carregarCliente();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setCliente((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/clientes/${id}`, cliente);
            alert('Cliente atualizado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao atualizar o cliente!');
        }
    };

    return (
        <div className="container">
            <h1>Editar Cliente</h1>
            <form action="/clientes" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input type="text" className="form-control" name="nome" value={cliente.nome} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone:</label>
                    <input type="text" className="form-control" name="telefone" value={cliente.telefone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço:</label>
                    <input type="text" className="form-control" name="endereco" value={cliente.endereco} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF:</label>
                    <input type="text" className="form-control" name="cpf" value={cliente.cpf}onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome no Cartão:</label>
                    <input type="text"className="form-control"  name="nomeCartao" value={cliente.nomeCartao} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">CVC:</label>
                    <input type="text" className="form-control" name="cvc" value={cliente.cvc}onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número do Cartão de Crédito:</label>
                    <input type="text" className="form-control" name="cartaoCredito" value={cliente.cartaoCredito} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sennnnha:</label>
                    <input type="password" className="form-control" name="senha" value={cliente.senha} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Atualizar</button>
            </form>
        </div>
    );
}