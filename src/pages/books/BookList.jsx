import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import { getApiErrorMessage } from "../../services/apiUtils";
import { deleteBook, getAllBooks } from "../../services/bookService";

const feedbackStyles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
};

function BookList() {
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({ type: "", text: "" });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = searchParams.get("q")?.trim().toLowerCase() || "";

    const loadBooks = async () => {
        try {
            setLoading(true);
            const response = await getAllBooks();
            setAllBooks(response);
            setFeedback((currentFeedback) =>
                currentFeedback.type === "error" ? { type: "", text: "" } : currentFeedback
            );
        } catch (error) {
            setFeedback({
                type: "error",
                text: getApiErrorMessage(error, "No se pudo cargar el listado de libros. Inténtalo de nuevo."),
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    useEffect(() => {
        if (!query) {
            setBooks(allBooks);
            return;
        }

        const filtered = allBooks.filter((book) => {
            const text = `${book.title || ""} ${book.isbn || ""} ${book.publicationYear || ""} ${book.author?.name || ""} ${book.author?.surname || ""}`.toLowerCase();
            return text.includes(query);
        });

        setBooks(filtered);
    }, [allBooks, query]);

    useEffect(() => {
        if (location.state?.feedback) {
            setFeedback(location.state.feedback);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este libro?")) {
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
                    text: getApiErrorMessage(error, "No se pudo eliminar el libro. Inténtalo de nuevo."),
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                <p className="text-slate-600">Cargando libros...</p>
            </div>
        );
    }

    const hasError = feedback.type === "error";
    const showEmptyCatalog = allBooks.length === 0 && !hasError;
    const showSearchEmptyState = Boolean(query) && allBooks.length > 0 && books.length === 0 && !hasError;
    const showBanner = feedback.text && (feedback.type === "success" || books.length > 0);

    return (
        <section className="space-y-6 py-4">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Libros</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Listado de libros</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Gestiona los libros disponibles y accede rápidamente a cada ficha.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/books/new")}
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                    Añadir libro
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
                        {feedback.type === "error" ? "No se pudo completar la acción." : "Operación completada."}
                    </p>
                    <p className="mt-1">{feedback.text}</p>
                </div>
            )}

            {hasError && books.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-rose-200 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">No se pudieron mostrar los libros</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Inténtalo de nuevo en unos segundos o vuelve a cargar el listado.
                    </p>
                    <button
                        type="button"
                        onClick={loadBooks}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 font-medium text-rose-700 transition-colors hover:bg-rose-100"
                    >
                        Reintentar
                    </button>
                </div>
            ) : showSearchEmptyState ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">No hay resultados para “{query}”</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Prueba con otro término o vuelve al catálogo completo para seguir navegando.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/books")}
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                    >
                        Ver todos los libros
                    </button>
                </div>
            ) : showEmptyCatalog ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">Aún no hay libros registrados</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Cuando añadas el primero, aparecerá aquí con su portada y sus datos principales.
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
                                { label: "ISBN", value: book.isbn || "-" },
                                { label: "Año", value: book.publicationYear || "-" },
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
