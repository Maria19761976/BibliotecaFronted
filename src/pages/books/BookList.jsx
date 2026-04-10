import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import "../../components/InfoCard.css";

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
            setMessage("No hemos podido encontrar los libros")
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("¿Estás seguro de que quieres borrar este libro")){
            try{
                await deleteBook(id);
                loadBooks();
            } catch (error) {
                setMessage("No se pudo borrar el libro")
            }
        }
    };

    if (loading) return <div className="List-page"><p>Buscando los libros</p></div>;

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