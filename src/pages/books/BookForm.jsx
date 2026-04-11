import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAuthors } from "../../services/authorService";
import { createBook, getBookById, updateBook } from "../../services/bookService";

const feedbackStyles = {
    error: "border-rose-200 bg-rose-50 text-rose-900",
};

function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [feedback, setFeedback] = useState({ type: "", text: "" });
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [book, setBook] = useState({
        title: "",
        isbn: "",
        publicationYear: "",
        image: "",
        authorId: "",
    });

    const loadData = async () => {
        try {
            setFetching(true);
            setLoadError(false);
            setFeedback({ type: "", text: "" });

            const [authorsData, bookData] = await Promise.all([
                getAllAuthors(),
                id ? getBookById(id) : Promise.resolve(null),
            ]);

            setAuthors(authorsData);

            if (bookData) {
                setBook({
                    title: bookData.title || "",
                    isbn: bookData.isbn || bookData.ISBN || "",
                    publicationYear: bookData.publicationYear || "",
                    image: bookData.image || "",
                    authorId: bookData.author?.id || bookData.authorId || "",
                });
            }
        } catch (error) {
            setLoadError(true);
            setFeedback({
                type: "error",
                text: id
                    ? "No se pudo cargar la información del libro. Inténtalo de nuevo."
                    : "No se pudo cargar la lista de autores. Inténtalo de nuevo.",
            });
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!book.title || !book.isbn || !book.publicationYear || !book.authorId) {
            setFeedback({
                type: "error",
                text: "Por favor, rellena todos los campos obligatorios.",
            });
            return;
        }

        const bookPayload = {
            title: book.title,
            isbn: book.isbn,
            publicationYear: Number(book.publicationYear),
            image: book.image,
            author: {
                id: Number(book.authorId),
            },
        };

        try {
            setLoading(true);
            setFeedback({ type: "", text: "" });

            if (id) {
                await updateBook(id, bookPayload);
                navigate("/books", {
                    replace: true,
                    state: { feedback: { type: "success", text: "Libro actualizado correctamente." } },
                });
                return;
            }

            await createBook(bookPayload);
            navigate("/books", {
                replace: true,
                state: { feedback: { type: "success", text: "Libro creado correctamente." } },
            });
        } catch (error) {
            setFeedback({
                type: "error",
                text: "No se pudo guardar el libro. Revisa los datos e inténtalo de nuevo.",
            });
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="mx-auto flex min-h-[40vh] max-w-3xl items-center justify-center px-4 py-10">
                <div className="rounded-3xl border border-slate-200 bg-white/85 px-8 py-10 text-center shadow-sm">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Libros</p>
                    <p className="mt-2 text-slate-600">Cargando datos del libro...</p>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
                <section className="rounded-3xl border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-700">Libros</p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                        No se pudo abrir esta ficha
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Comprueba la conexión o vuelve al listado para continuar con otra acción.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={loadData}
                            className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                        >
                            Reintentar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/books")}
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                        >
                            Volver al listado
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
            <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500" />
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Libros</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        {id ? "Editar libro" : "Nuevo libro"}
                    </h1>
                    <p className="text-sm text-slate-600">
                        {id
                            ? "Actualiza la información del libro y guarda los cambios cuando esté todo revisado."
                            : "Completa los datos del libro para crear un nuevo registro en la biblioteca."}
                    </p>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Los campos de título, ISBN, año de publicación y autor son obligatorios.
                </div>

                {feedback.text && (
                    <div
                        role="alert"
                        className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                            feedbackStyles[feedback.type] || "border-slate-200 bg-white text-slate-700"
                        }`}
                    >
                        <p className="font-medium">No se pudo completar la acción.</p>
                        <p className="mt-1">{feedback.text}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6">
                    <fieldset disabled={loading} className="grid gap-5 border-0 p-0">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="title" className="text-sm font-medium text-slate-700">
                                    Título
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={book.title}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="isbn" className="text-sm font-medium text-slate-700">
                                    ISBN
                                </label>
                                <input
                                    id="isbn"
                                    name="isbn"
                                    value={book.isbn}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="publicationYear" className="text-sm font-medium text-slate-700">
                                    Año de publicación
                                </label>
                                <input
                                    id="publicationYear"
                                    name="publicationYear"
                                    type="number"
                                    value={book.publicationYear}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium text-slate-700">
                                URL de la imagen
                            </label>
                            <input
                                id="image"
                                name="image"
                                value={book.image}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="authorId" className="text-sm font-medium text-slate-700">
                                Autor
                            </label>
                            <select
                                id="authorId"
                                name="authorId"
                                value={book.authorId}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                            >
                                <option value="">Selecciona un autor</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name} {author.surname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
                            >
                                {loading ? "Guardando..." : id ? "Guardar cambios" : "Crear libro"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/books")}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                            >
                                Volver al listado
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
}

export default BookForm;