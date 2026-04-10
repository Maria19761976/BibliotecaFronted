import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const response = await getAllBooks();
            setBooks(Array.isArray(response) ? response : []);
        } catch (error) {
            setMessage("No hemos podido encontrar los libros.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de que quieres borrar este libro?")) {
            try {
                await deleteBook(id);
                loadBooks();
            } catch (error) {
                setMessage("No se pudo borrar el libro.");
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

    return (
        <section className="space-y-6 py-4">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Libros</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Listado de libros</h1>
                </div>
                <button onClick={() => navigate("/books/new")}>Anadir libro</button>
            </div>

            {message && (
                <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {message}
                </p>
            )}

            {books.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
                    No hay libros disponibles todavia.
                </p>
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
