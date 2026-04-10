<<<<<<< HEAD
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>📚 Biblioteca</h2>
            <ul>
                <li><Link to="/authors">Authors</Link></li>
                <li><Link to="/books">Books</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
=======
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <h1>La Biblioteca</h1>

      <nav>
        <span>Inicio</span>
        <span>Autor</span>

      </nav>
    </header>
  )
}
>>>>>>> feat/index
