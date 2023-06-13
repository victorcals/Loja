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
        // login teste cliente
        if (email === 'cliente@cliente.com' && password === 'senhaCliente') {

            navigate('/');
            // login teste adm
        } else if (email === 'admin@admin.com' && password === 'senhaAdmin') {

            navigate('/admin');
        } else {

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
