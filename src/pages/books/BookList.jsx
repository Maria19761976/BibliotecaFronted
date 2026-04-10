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
        try {
            const response = await getAllBooks();
            setBooks(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Error loading books:", error);
            setBooks([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await deleteBook(id);
                loadBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
            }
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
                            title={book.title}
                            imageUrl={book.image}
                            fields={[
                                { label: "ISBN", value: book.ISBN || "-" },
                                { label: "Year", value: book.publicationYear || "-" },
                                {
                                    label: "Author",
                                    // Usamos author (con h) que es como viene en tu JSON de Tolkien
                                    value: `${book.author?.name || ""} ${book.author?.surname || ""}`.trim() || "-",
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