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
        if (window.confirm("Are you sure you want to delete this author?")) {
            await deleteAuthor(id);
            loadAuthors();
        }
    };

    return (
        <div>
            <h1>Authors</h1>
            <button onClick={() => navigate("/authors/new")}>Add author</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Nationality</th>
                        <th>Birth year</th>
                        <th>Alive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.nombre}</td>
                            <td>{author.apellido}</td>
                            <td>{author.nacionalidad}</td>
                            <td>{author.anioNacimiento}</td>
                            <td>{author.vivo ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => navigate(`/authors/edit/${author.id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(author.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AuthorList;
