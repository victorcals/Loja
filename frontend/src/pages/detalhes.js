import React from 'react';
import Title from './../components/Title/index';
import Detalhes from '../components/detalhes/detalhes';

export default function Login() {
    return (
        <div>
            <Title
                title={"teste"}
                text={"Exibição do pedido"} />
            <Detalhes />
        </div>
    )
}