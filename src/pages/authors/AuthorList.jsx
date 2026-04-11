import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import { deleteAuthor, getAllAuthors } from "../../services/authorService";

const feedbackStyles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
};

function AuthorList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({ type: "", text: "" });

    const loadAuthors = async () => {
        try {
            setLoading(true);
            const response = await getAllAuthors();
            const loadedAuthors = Array.isArray(response) ? response : [];
            setAuthors(loadedAuthors);
            setFeedback((currentFeedback) =>
                currentFeedback.type === "error" ? { type: "", text: "" } : currentFeedback
            );
        } catch (error) {
            setFeedback({
                type: "error",
                text: "No se pudo cargar el listado de autores. Intentalo de nuevo.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    useEffect(() => {
        if (location.state?.feedback) {
            setFeedback(location.state.feedback);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de que quieres eliminar este autor?")) {
            try {
                await deleteAuthor(id);
                setFeedback({
                    type: "success",
                    text: "Autor eliminado correctamente.",
                });
                await loadAuthors();
            } catch (error) {
                setFeedback({
                    type: "error",
                    text: "No se pudo eliminar el autor. Intentalo de nuevo.",
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                <p className="text-slate-600">Cargando autores...</p>
            </div>
        );
    }

    const hasError = feedback.type === "error";
    const showEmptyState = authors.length === 0 && !hasError;
    const showBanner = feedback.text && (feedback.type === "success" || authors.length > 0);

    return (
        <section className="space-y-6 py-4">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Autores</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Listado de autores</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Consulta, edita o anade nuevos registros de autores.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/authors/new")}
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                    Anadir autor
                </button>
            </div>

            {showBanner && (
                <div
                    role={feedback.type === "error" ? "alert" : "status"}
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                        feedbackStyles[feedback.type] || "border-slate-200 bg-white text-slate-700"
                    }`}
                >
                    <p className="font-medium">
                        {feedback.type === "error" ? "No se pudo completar la accion." : "Operacion completada."}
                    </p>
                    <p className="mt-1">{feedback.text}</p>
                </div>
            )}

            {hasError && authors.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-rose-200 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">No se pudieron mostrar los autores</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Intentalo de nuevo en unos segundos o vuelve a cargar el listado.
                    </p>
                    <button
                        type="button"
                        onClick={loadAuthors}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 font-medium text-rose-700 transition-colors hover:bg-rose-100"
                    >
                        Reintentar
                    </button>
                </div>
            ) : showEmptyState ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">Aun no hay autores registrados</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Cuando anadas el primero, aparecera aqui con sus datos principales.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/authors/new")}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                    >
                        Crear primer autor
                    </button>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {authors.map((author) => (
                        <InfoCard
                            key={author.id}
                            title={`${author.name} ${author.surname}`}
                            fields={[
                                { label: "Nacionalidad", value: author.nationality || "-" },
                                { label: "Nacimiento", value: author.birthYear || "-" },
                                { label: "Vive", value: author.alive ? "Si" : "No" },
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
