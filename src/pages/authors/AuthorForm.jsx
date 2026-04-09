import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAuthor, getAuthorById, updateAuthor } from "../../services/authorService";

function AuthorForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState({
        nombre: "",
        apellido: "",
        nacionalidad: "",
        anioNacimiento: "",
        vivo: true,
    });

    useEffect(() => {
        if (id) {
            loadAuthor();
        }
    }, [id]);

    const loadAuthor = async () => {
        const response = await getAuthorById(id);
        setAuthor(response.data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAuthor({ ...author, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author.nombre || !author.apellido || !author.nacionalidad || !author.anioNacimiento) {
            setMessage("Por favor rellena todos los campos.");
            return;
        }
        try {
            if (id) {
                await updateAuthor(id, author);
                setMessage("Autor actualizado correctamente.");
            } else {
                await createAuthor(author);
                setMessage("Autor creado correctamente.");
            }
            setTimeout(() => navigate("/authors"), 1500);
        } catch (error) {
            setMessage("Error al guardar el autor.");
        }
    };

    return (
        <div>
            <h1>{id ? "Editar autor" : "Nuevo autor"}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input name="nombre" value={author.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label>Apellido</label>
                    <input name="apellido" value={author.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label>Nacionalidad</label>
                    <input name="nacionalidad" value={author.nacionalidad} onChange={handleChange} />
                </div>
                <div>
                    <label>Año de nacimiento</label>
                    <input name="anioNacimiento" type="number" value={author.anioNacimiento} onChange={handleChange} />
                </div>
                <div>
                    <label>¿Vivo?</label>
                    <input name="vivo" type="checkbox" checked={author.vivo} onChange={handleChange} />
                </div>
                <button type="submit">{id ? "Actualizar" : "Crear"}</button>
                <button type="button" onClick={() => navigate("/authors")}>Cancelar</button>
            </form>
        </div>
    );
}

export default AuthorForm;