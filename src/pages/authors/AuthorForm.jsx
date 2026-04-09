import { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        const response = await getAllAuthors();
        setAuthors(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este autor?")) {
            await deleteAuthor(id);
            loadAuthors();
        }
    };

    return (
        <div>
            <h1>Autores</h1>
            <button onClick={() => navigate("/authors/new")}>Añadir autor</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nacionalidad</th>
                        <th>Año nacimiento</th>
                        <th>Vivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.nombre}</td>
                            <td>{author.apellido}</td>
                            <td>{author.nacionalidad}</td>
                            <td>{author.anioNacimiento}</td>
                            <td>{author.vivo ? "Sí" : "No"}</td>
                            <td>
                                <button onClick={() => navigate(`/authors/edit/${author.id}`)}>Editar</button>
                                <button onClick={() => handleDelete(author.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AuthorList;