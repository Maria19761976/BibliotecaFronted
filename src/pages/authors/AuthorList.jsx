import { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors();
    }, []);

const loadAuthors = async () => {
        try {
            setLoading(true);
            const response = await getAllAuthors();
            setAuthors(response.data || response); 
            setErrorMsg("");
        } catch (error) {
            console.error(error);
            setErrorMsg("No se pudieron cargar los autores. ¿Está el Backend encendido?");
        } finally {
            setLoading(false);
        }
    };

const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this author?");
        if (!ok) return;

        try {
            await deleteAuthor(id);
            await loadAuthors();
        } catch (error) {
            console.error(error);
            alert("Error al intentar eliminar el autor.");
        }
    };

    if (loading) return <p>Cargando autores...</p>;

    if (errorMsg) return <div style={{ color: 'red' }}>{errorMsg}</div>;

return (
        <div>
            <h1>Authors</h1>
            <button onClick={() => navigate("/authors/new")}>Add author</button>
            
            {authors.length === 0 ? (
                <p>No hay autores registrados.</p>
            ) : (
                <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
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
                                <td>{author.name}</td>
                                <td>{author.surname}</td>
                                <td>{author.nationality}</td>
                                <td>{author.birthYear}</td>
                                <td>{author.alive ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => navigate(`/authors/edit/${author.id}`)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(author.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AuthorList;
