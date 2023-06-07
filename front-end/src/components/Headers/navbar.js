import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const url = location.pathname;
    const showButton = url !== "/cadastro";
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-item nav-link" to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-item nav-link" to='/logar'>Logar</Link>
                    </li>

                </ul>
            </div>
            <div>
                {showButton && (
                    <Link
                        className="nav-link" to='/cadastro'>
                        <button className='nav btn btn-dark' type="button"> Cadastrar</button>
                    </Link>
                )}

            </div>
        </nav>



    )

}

export default Navbar;