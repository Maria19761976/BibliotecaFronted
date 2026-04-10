import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar__brand">Biblioteca</h2>
            <ul className="navbar__links">
                <li><Link to="/authors">Autores</Link></li>
                <li><Link to="/books">Libros</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
