import { Routes, Route } from 'react-router-dom';

import './index.css';
import Login from './pages/Login';
import Cliente from './pages/Cliente';
import Pedido from './pages/Pedido';
import Home from './pages/home/home';
import Detalhes from '../src/pages/detalhes/detalhes';
import EditarCliente from './components/editarCliente/editar';
import ListaClientes from './components/editarCliente/editarAdm';





export default function RoutesConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pedido' element={<Pedido />} />
            <Route path='cliente' element={<Cliente />} />
            <Route path='login' element={<Login />} />
            <Route path='/detalhes/:id' element={<Detalhes />} />
            <Route path='/clientes/:id' element={<EditarCliente />} />




            {/* O ADM VAI USAR ISSO AQUI */}
            {/* <Route path='/clientesdm' element={<ListaClientes />} /> */}







            <Route path='*' element={<h1> 404 - Página Não Encontrada!</h1>} />
        </Routes>
    );
}