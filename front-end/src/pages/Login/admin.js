import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './admin.css'

function AdminArea() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleLogin(event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // login teste cliente
        if (email === 'cliente@cliente.com' && password === 'senhaCliente') {
            navigate('/');
            // login teste adm
        } else if (email === 'admin@admin.com' && password === 'senhaAdmin') {
            navigate('/baseADM');
        } else {
            alert('Email ou senha inválidos');
        }
    }

    return (
        <form className="form" onSubmit={handleLogin}>
            <div className="input-span">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="input-span">
                <label htmlFor="password" className="label">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="span">
                <a href="#">Forgot password?</a>
            </div>
            <input className="submit" type="submit" value="Log in" />
            <div className="span">
                Don't have an account? <a href="#">Sign up</a>
            </div>
        </form>
    );
}

export default AdminArea;
