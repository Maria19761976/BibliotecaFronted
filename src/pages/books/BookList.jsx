import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import "../../components/InfoCard.css";

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const books = await getAllBooks();
        setBooks(books);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de que quieres eliminar este libro?")) {
            await deleteBook(id);
            loadBooks();
        }
    };

    return (
        <div className="list-page">
            <div className="list-page__header">
                <h1>Libros</h1>
                <button onClick={() => navigate("/books/new")}>Agregar libro</button>
            </div>

            {books.length === 0 ? (
                <p className="list-page__empty">Todavia no hay libros disponibles.</p>
            ) : (
                <div className="list-page__grid">
                    {books.map((book) => (
                        <InfoCard
                            key={book.id}
                            title={book.titulo}
                            imageUrl={book.imagen}
                            fields={[
                                { label: "ISBN", value: book.isbn || "-" },
                                { label: "Anio", value: book.anioPublicacion || "-" },
                                {
                                    label: "Autor",
                                    value: `${book.autor?.nombre || ""} ${book.autor?.apellido || ""}`.trim() || "-",
                                },
                            ]}
                            onEdit={() => navigate(`/books/edit/${book.id}`)}
                            onDelete={() => handleDelete(book.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookList;
