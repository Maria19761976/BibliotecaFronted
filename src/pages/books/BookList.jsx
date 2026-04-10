import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const response = await getAllBooks();
        setBooks(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            loadBooks();
        }
    };

    return (
        <div>
            <h1>Books</h1>
            <button onClick={() => navigate("/books/new")}>Add book</button>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Year</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>
                                <img src={book.image} alt={book.title} width="50" />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.ISBN}</td>
                            <td>{book.publicationYear}</td>
                            <td>{book.author?.name} {book.name?.surname}</td>
                            <td>
                                <button onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;