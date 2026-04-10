import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Biblioteca</h2>
            <ul>
                <li><Link to="/authors">Autores</Link></li>
                <li><Link to="/books">Libros</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
