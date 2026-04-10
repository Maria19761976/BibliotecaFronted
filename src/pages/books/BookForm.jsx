import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";

function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({
        title: "",
        ISBN: "",
        publicationYear: "",
        image: "",
        authorId: "",
    });

    useEffect(() => {
        loadAuthors();
        if (id) {
            loadBook();
        }
    }, [id]);

    const loadAuthors = async () => {
        const authors = await getAllAuthors();
        setAuthors(authors);
    };

    const loadBook = async () => {
        const data = await getBookById(id);
        setBook({
            title: data.title,
            ISBN: data.ISBN,
            publicationYear: data.publicationYear,
            image: data.image,
            authorId: data.author?.id || "",
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!book.title || !book.ISBN || !book.publicationYear || !book.authorId) {
            setMessage("Por favor rellena todos los campos.");
            return;
        }

        const bookPayload = {
            ...book,
            publicationYear: Number(book.publicationYear),
            authorId: Number(book.authorId),
        };

        try {
            if (id) {
                await updateBook(id, bookPayload);
                setMessage("Libro actualizado correctamente.");
            } else {
                await createBook(bookPayload);
                setMessage("Libro creado correctamente.");
            }
            setTimeout(() => navigate("/books"), 1500);
        } catch (error) {
            setMessage("Error al guardar el libro.");
        }
    };

    return (
        <div>
            <h1>{id ? "Editar libro" : "Nuevo libro"}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input name="title" value={book.title} onChange={handleChange} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input name="ISBN" value={book.ISBN} onChange={handleChange} />
                </div>
                <div>
                    <label>Año de publicación</label>
                    <input name="publicationYear" type="number" value={book.publicationYear} onChange={handleChange} />
                </div>
                <div>
                    <label>URL de la imagen</label>
                    <input name="image" value={book.image} onChange={handleChange} />
                </div>
                <div>
                    <label>Autor</label>
                    <select name="autorId" value={book.autorId} onChange={handleChange}>
                        <option value="">Selecciona un autor</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name} {author.surname}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{id ? "Actualizar" : "Crear"}</button>
                <button type="button" onClick={() => navigate("/books")}>Cancelar</button>
            </form>
        </div>
    );
}

export default BookForm;
