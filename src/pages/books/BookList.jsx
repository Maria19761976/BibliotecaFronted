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
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            loadBooks();
        }
    };

    return (
        <div className="list-page">
            <div className="list-page__header">
                <h1>Books</h1>
                <button onClick={() => navigate("/books/new")}>Add book</button>
            </div>

            {books.length === 0 ? (
                <p className="list-page__empty">No books available yet.</p>
            ) : (
                <div className="list-page__grid">
                    {books.map((book) => (
                        <InfoCard
                            key={book.id}
                            title={book.titulo}
                            imageUrl={book.imagen}
                            fields={[
                                { label: "ISBN", value: book.isbn || "-" },
                                { label: "Year", value: book.anioPublicacion || "-" },
                                {
                                    label: "Author",
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
