import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../Login/login.css';

function Logar() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleLogin() {
        // Verificar o tipo de usuário com base no email e senha fornecidos
        if (email === 'cliente@cliente.com' && password === 'senhaCliente') {
            // Cliente logado
            navigate('/');
        } else if (email === 'admin@admin.com' && password === 'senhaAdmin') {
            // Administrador logado
            navigate('/admin');
        } else {
            // Informações de login inválidas
            alert('Email ou senha inválidos');
        }
    }

    return (
        <div className="container">
            <div className="card">
                <a className="login">Log in</a>
                <div className="inputBox">
                    <input type="text" value={email} onChange={handleEmailChange} />
                    <span className="user">Username</span>
                </div>

                <div className="inputBox">
                    <input type="password" value={password} onChange={handlePasswordChange} />
                    <span>Password</span>
                </div>

                <button className="enter" onClick={handleLogin}>entrar</button>

                <Link to="/">cadastrar</Link>
            </div>
        </div>
    );
}

export default Logar;
