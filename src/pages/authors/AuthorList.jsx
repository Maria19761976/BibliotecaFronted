import { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import "../../components/InfoCard.css";

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState([]);
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
                            title={`${author.name} ${author.surname}`}
                            fields={[
                                { label: "Nationality", value: author.nationality || "-" },
                                { label: "Birth year", value: author.birthYear || "-" },
                                { label: "Alive", value: author.alive ? "Yes" : "No" },
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
