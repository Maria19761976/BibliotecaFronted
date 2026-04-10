import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAuthor, getAuthorById, updateAuthor } from "../../services/authorService";

function AuthorForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    
    const [author, setAuthor] = useState({
        name: "",
        surname: "",
        nationality: "",
        birthYear: "",
        alive: true,
    });

    useEffect(() => {
        if (id) {
            loadAuthor();
        }
    }, [id]);

    const loadAuthor = async () => {
        try{
            setFetching(true);
            const author = await getAuthorById(id);
            setAuthor({
                name: data.name || "",
                surname: data.surname || "",
                nationality: data.nationality || "",
                birthYear: data.birthYear || "",
                alive: data.alive !== undefined ? data.alive : true,
            });
        } catch (error){
            setMessage("No se pudo cargar la información del autor");
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setAuthor({ ...author, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!author.name || !author.surname || !author.nationality || !author.birthYear) {
            setMessage("Por favor rellena todos los campos.");
            return;
        }

        const authorPayload = {
            ...author,
            birthYear: Number(author.birthYear),
        };

        try {
            setLoading(true);
            setMessage("");

            if (id) {
                await updateAuthor(id, authorPayload);
                setMessage("Autor actualizado correctamente.");
            } else {
                await createAuthor(authorPayload);
                setMessage("Autor creado correctamente.");
            }
            setTimeout(() => navigate("/authors"), 1500);
        } catch (error) {
            setMessage("Error al guardar el autor.");
        } finally {
            setLoading(false);
        }
    };

    if(fetching) return <p>Cargando datos del autor...</p>;

    return (
        <div>
            <h1>{id ? "Editar autor" : "Nuevo autor"}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading} style={{ border: 'none', padding: 0 }}>
                    <div>
                    <label>Nombre</label>
                    <input name="name" value={author.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input name="surname" value={author.surname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Nacionalidad</label>
                        <input name="nationality" value={author.nationality} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Año de nacimiento</label>
                        <input name="birthYear" type="number" value={author.birthYear} onChange={handleChange} />
                    </div>
                    <div>
                        <label>¿Vive?</label>
                        <input name="alive" type="checkbox" checked={author.alive} onChange={handleChange} />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Guardando..." :(id ? "Actualizar" : "Crear")}
                    </button>
                    <button type="button" onClick={() => navigate("/authors")}>Cancelar</button>
                </fieldset>
            </form>
        </div>
    );
}

export default AuthorForm;