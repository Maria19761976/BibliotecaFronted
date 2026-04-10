import { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";

function AuthorList() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        try {
            setLoading(true);
            const response = await getAllAuthors();
            setAuthors(response.data || response);
        } catch (error) {
            setMessage("No se pudieron cargar los autores. ¿Está el backend encendido?");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres borrar este autor?")) {
            try {
                await deleteAuthor(id);
                loadAuthors();
            } catch (error) {
                setMessage("No se pudo borrar el autor.");
            }
        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                <p className="text-slate-600">Cargando biblioteca...</p>
            </div>
        );
    }

    return (
        <section className="space-y-6 py-4">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Autores</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Listado de autores</h1>
                </div>
                <button onClick={() => navigate("/authors/new")}>Añadir autor</button>
            </div>

            {message && (
                <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {message}
                </p>
            )}

            {authors.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
                    No hay autores disponibles todavía.
                </p>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {authors.map((author) => (
                        <InfoCard
                            key={author.id}
                            title={`${author.name} ${author.surname}`}
                            fields={[
                                { label: "Nacionalidad", value: author.nationality || "-" },
                                { label: "Nacimiento", value: author.birthYear || "-" },
                                { label: "Vive", value: author.alive ? "Sí" : "No" },
                            ]}
                            onEdit={() => navigate(`/authors/edit/${author.id}`)}
                            onDelete={() => handleDelete(author.id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default AuthorList;
