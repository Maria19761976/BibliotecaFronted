import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";

function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

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
        try{
            setFetching(true);
            const authors = await getAllAuthors();
            setAuthors(authors);
        } catch (error){
            setMessage("No encontramos la información de los autores");
        } finally {
            setFetching(false)
        }
    };

    const loadBook = async () => {
        try{
            setFetching(true);
            const data = await getBookById(id);
            setBook({
                title: data.title,
                ISBN: data.ISBN,
                publicationYear: data.publicationYear,
                image: data.image,
                authorId: data.author?.id || "",
            });
        } catch (error) {
            setMessage("No se pudo cargar la información del libro")
        } finally {
            setFetching(false);
        }
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
            setLoading(true);
            setMessage("");

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
        } finally{
            setLoading(false);
        }
    };

    if(fetching) return <p>Cargando los datos de los libros..</p>

    return (
        <div>
            <h1>{id ? "Editar libro" : "Nuevo libro"}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading} style={{ border: 'none', padding: 0 }}>
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
                        <select name="autorId" value={book.authorId} onChange={handleChange}>
                            <option value="">Selecciona un autor</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name} {author.surname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">
                        {loading ? "Guardando..." :(id ? "Actualizar" : "Crear")}
                    </button>
                    <button type="button" onClick={() => navigate("/books")}>Cancelar</button>
                </fieldset>
            </form>
        </div>
    );
}

export default BookForm;