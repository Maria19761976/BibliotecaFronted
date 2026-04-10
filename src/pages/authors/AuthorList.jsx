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
        <div className="list-page">
            <div className="list-page__header">
                <h1>Authors</h1>
                <button onClick={() => navigate("/authors/new")}>Add author</button>
            </div>

            {authors.length === 0 ? (
                <p className="list-page__empty">No authors available yet.</p>
            ) : (
                <div className="list-page__grid">
                    {authors.map((author) => (
                        <InfoCard
                            key={author.id}
                            title={`${author.nombre} ${author.apellido}`}
                            fields={[
                                { label: "Nationality", value: author.nacionalidad || "-" },
                                { label: "Birth year", value: author.anioNacimiento || "-" },
                                { label: "Alive", value: author.vivo ? "Yes" : "No" },
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
