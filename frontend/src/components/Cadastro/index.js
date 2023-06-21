import React, { useState } from 'react';
import api from '../../services/api';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [cartaoCredito, setCartaoCredito] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const bodyParam = {
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            cpf: cpf,
            cartaoCredito: cartaoCredito,
            image: image,
            email: email,
            senha: senha
        }

        api.post('/clientes', bodyParam)
            .then((response) => {
                console.log(response.data)
                alert(" O usuario " + response.data.codigo + " foi criado com sucesso!")
            })
            .catch((err) => {
                console.error(err)
                alert(" Ocorreu um erro! Veja no console ..")
            })
            .finally(() => {
                setNome("")
                setTelefone("")
                setEndereco("")
                setCpf("")
                setCartaoCredito("")
                setImage("")
                setEmail("")
                setSenha("")
            })
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Nome:
                                <input type="text" className="form-control" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Telefone:
                                <input type="text" className="form-control" value={telefone} onChange={(e) => { setTelefone(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Endereço:
                                <input type="text" className="form-control" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Cpf:
                                <input type="text" className="form-control" value={cpf} onChange={(e) => { setCpf(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Numero Cartão:
                                <input type="text" className="form-control" value={cartaoCredito} onChange={(e) => { setCartaoCredito(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="auth-wrapper">
                            <div className="auth-inner" style={{ width: "auto"}}>
                                    Foto de Perfil:<br/>
                                    <input accept="image/" type="file" onChange={(e) => { setImage(e.target.files[0]) }}/>                                  
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Email:
                                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Senha:
                                <input type="password" className="form-control" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
