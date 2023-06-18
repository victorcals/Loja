import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Login/login.css';

function Logar() {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
 //Faz a Busca no banco para ver se existe cadastro e efetua o login
  async function handleLogin() {
    try {
      const response = await axios.get('http://localhost:3000/client/', {
        email,
        senha
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        alert('Email ou senha inválidos');
      }
    } catch (error) {
      console.error(error);
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
          <input type="password" value={senha} onChange={handlePasswordChange} />
          <span>Password</span>
        </div>
        <button className="enter" onClick={handleLogin}>entrar</button>
        <Link to="/">cadastrar</Link>
      </div>
    </div>
  );
}

export default Logar;
