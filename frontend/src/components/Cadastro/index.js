import React, { useState } from 'react';
import api from '../../services/api';
// Teste

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomeCartao, setNomeCartao] = useState('');
    const [cartaoCredito, setCartaoCredito] = useState('');
    const [cvc, setCvc] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();


        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('telefone', telefone);
        formData.append('endereco', endereco);
        formData.append('cpf', cpf);
        formData.append('nomeCartao', nomeCartao);
        formData.append('cartaoCredito', cartaoCredito);
        formData.append('cvc', cvc);
        formData.append('image', image);
        formData.append('email', email);
        formData.append('senha', senha);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        api.post('/clientes', formData, config)
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
                setNomeCartao("")
                setCartaoCredito("")
                setCvc("")
                setImage("")
                setEmail("")
                setSenha("")
            })

    }
    //Formata o input do numero do cartão 
    const formatCardNumber = (value) => {
        const cardNumber = value.replace(/\D/g, ''); // Remove qualquer caractere que não seja dígito do valor do cartão       
        const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1-'); // Aplica a formatação com hífens
        return formattedCardNumber;
    };

    return (

        <div className="container">
            <form action="/clientes" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 ">
                        <div>
                            <div className="mt-3">
                                <h1> Dados do usuário </h1>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label >Nome Completo:</label><br />
                            <input type="text" className="form-control" value={nome} onChange={(e) => { setNome(e.target.value) }} required />
                        </div>
                        <div className="mt-3">
                            <label >Telefone:</label><br />
                            <input type="text" className="form-control" value={telefone} onChange={(e) => { setTelefone(e.target.value) }} required/>
                        </div>
                        <div className="mt-3">
                            <label >Endereço de entrega:</label><br />
                            <input type="text" className="form-control" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} required/>
                        </div>
                        <div className="mt-3">
                            <label >CPF:</label><br />
                            <input type="text" className="form-control" value={cpf} onChange={(e) => { setCpf(e.target.value) }} required/><br />
                        </div>
                        <div className="mt-3 border">
                            <div className="auth-inner " style={{ width: "auto" }}>
                                <label htmlFor="profile-pic" className="d-flex flex-column align-items-center">
                                    Foto de Perfil: <br />
                                    <div className="rounded-circle overflow-hidden" style={{ width: "150px", height: "150px" }}>
                                        <img src={image ? URL.createObjectURL(image) : "placeholder.jpg"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                </label>
                                <input id="profile-pic" type="file" className="d-none" onChange={(e) => { setImage(e.target.files[0]) }} required/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="mt-3">
                            <h1> Dados do Cartão </h1>
                        </div>
                        <div className="mt-3">
                            <label >Nome no Cartão:</label><br />
                            <input type="text" className="form-control" value={nomeCartao} onChange={(e) => { setNomeCartao(e.target.value) }} required/>
                        </div>
                        <div className="mt-3">
                            <label>Número do Cartão:</label><br />
                            <input type="text" className="form-control" id="CartaoCreditoInput" maxLength={19} value={formatCardNumber(cartaoCredito)} onChange={(e) => { setCartaoCredito(e.target.value) }} required/>
                        </div>
                        <div className="mt-3">
                            <label >Número do CVC:</label><br />
                            <input type="password" className="form-control" maxLength={3} required value={cvc} onChange={(e) => { setCvc(e.target.value) }} />
                        </div>
                        <div className="mt-5">
                            <div className="mt-3">
                                <label>Email: </label>
                                <input type="email" className="form-control" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label>Senha: </label>
                            <input type="password" className="form-control" required value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-5 text-center">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </div>
                </div>
            </form>

        </div>


    );
}
