import React from 'react';
import { Link } from 'react-router-dom';

export default function ListaClientes({ clientes }) {
    return (
        <div className="container">
            <h1>Clientes</h1>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        {cliente.nome} - {cliente.email}
                        <Link to={`/clientes/${cliente.id}/editar`}>Editar</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
