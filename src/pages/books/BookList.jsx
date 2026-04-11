import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import { deleteBook, getAllBooks } from "../../services/bookService";

const feedbackStyles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
};

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({ type: "", text: "" });
    const navigate = useNavigate();
    const location = useLocation();

    const loadBooks = async () => {
        try {
            setLoading(true);
            const response = await getAllBooks();
            setBooks(Array.isArray(response) ? response : []);
            setFeedback((currentFeedback) =>
                currentFeedback.type === "error" ? { type: "", text: "" } : currentFeedback
            );
        } catch (error) {
            setFeedback({
                type: "error",
                text: "No se pudo cargar el listado de libros. Intentalo de nuevo.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    useEffect(() => {
        if (location.state?.feedback) {
            setFeedback(location.state.feedback);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de que quieres eliminar este libro?")) {
            try {
                await deleteBook(id);
                setFeedback({
                    type: "success",
                    text: "Libro eliminado correctamente.",
                });
                await loadBooks();
            } catch (error) {
                setFeedback({
                    type: "error",
                    text: "No se pudo eliminar el libro. Intentalo de nuevo.",
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                <p className="text-slate-600">Buscando los libros...</p>
            </div>
        );
    }

    const hasError = feedback.type === "error";
    const showEmptyState = books.length === 0 && !hasError;
    const showBanner = feedback.text && (feedback.type === "success" || books.length > 0);

    return (
        <section className="space-y-6 py-4">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Libros</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Listado de libros</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Gestiona los libros disponibles y accede rapidamente a cada ficha.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/books/new")}
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                    Anadir libro
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

            {hasError && books.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-rose-200 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">No se pudieron mostrar los libros</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Intentalo de nuevo en unos segundos o vuelve a cargar el listado.
                    </p>
                    <button
                        type="button"
                        onClick={loadBooks}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 font-medium text-rose-700 transition-colors hover:bg-rose-100"
                    >
                        Reintentar
                    </button>
                </div>
            ) : showEmptyState ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">Aun no hay libros registrados</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Cuando anadas el primero, aparecera aqui con su portada y sus datos principales.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/books/new")}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                    >
                        Crear primer libro
                    </button>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {books.map((book) => (
                        <InfoCard
                            key={book.id}
                            title={book.title}
                            imageUrl={book.image}
                            fields={[
                                { label: "ISBN", value: book.ISBN || "-" },
                                { label: "Ano", value: book.publicationYear || "-" },
                                {
                                    label: "Autor",
                                    value: `${book.author?.name || ""} ${book.author?.surname || ""}`.trim() || "-",
                                },
                            ]}
                            onEdit={() => navigate(`/books/edit/${book.id}`)}
                            onDelete={() => handleDelete(book.id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default BookList;
