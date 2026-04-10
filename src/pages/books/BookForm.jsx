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
        titulo: "",
        isbn: "",
        anioPublicacion: "",
        imagen: "",
        autorId: "",
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
            titulo: data.titulo,
            isbn: data.isbn,
            anioPublicacion: data.anioPublicacion,
            imagen: data.imagen,
            autorId: data.autor?.id || "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!book.titulo || !book.isbn || !book.anioPublicacion || !book.autorId) {
            setMessage("Por favor rellena todos los campos.");
            return;
        }

        const bookPayload = {
            ...book,
            anioPublicacion: Number(book.anioPublicacion),
            autorId: Number(book.autorId),
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
                    <label>Titulo</label>
                    <input name="titulo" value={book.titulo} onChange={handleChange} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input name="isbn" value={book.isbn} onChange={handleChange} />
                </div>
                <div>
                    <label>Anio de publicacion</label>
                    <input name="anioPublicacion" type="number" value={book.anioPublicacion} onChange={handleChange} />
                </div>
                <div>
                    <label>URL de la imagen</label>
                    <input name="imagen" value={book.imagen} onChange={handleChange} />
                </div>
                <div>
                    <label>Autor</label>
                    <select name="autorId" value={book.autorId} onChange={handleChange}>
                        <option value="">Selecciona un autor</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.nombre} {author.apellido}
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
