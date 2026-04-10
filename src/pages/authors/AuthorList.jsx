import { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import "../../components/InfoCard.css";

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        const authors = await getAllAuthors();
        setAuthors(authors);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este autor?")) {
            await deleteAuthor(id);
            loadAuthors();
        }
    };

    return (
        <div className="list-page">
            <div className="list-page__header">
                <h1>Autores</h1>
                <button onClick={() => navigate("/authors/new")}>Agregar autor</button>
            </div>

            {authors.length === 0 ? (
                <p className="list-page__empty">Todavía no hay autores disponibles.</p>
            ) : (
                <div className="list-page__grid">
                    {authors.map((author) => (
                        <InfoCard
                            key={author.id}
                            title={`${author.nombre} ${author.apellido}`}
                            fields={[
                                { label: "Nacionalidad", value: author.nacionalidad || "-" },
                                { label: "Año de nacimiento", value: author.anioNacimiento || "-" },
                                { label: "Vive", value: author.vivo ? "Sí" : "No" },
                            ]}
                            onEdit={() => navigate(`/authors/edit/${author.id}`)}
                            onDelete={() => handleDelete(author.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default AuthorList;
