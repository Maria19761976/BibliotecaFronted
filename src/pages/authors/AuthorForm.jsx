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
        try {
            setFetching(true);
            const authorData = await getAuthorById(id);
            setAuthor({
                name: authorData.name || "",
                surname: authorData.surname || "",
                nationality: authorData.nationality || "",
                birthYear: authorData.birthYear || "",
                alive: authorData.alive !== undefined ? authorData.alive : true,
            });
        } catch (error) {
            setMessage("No se pudo cargar la información del autor.");
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

    if (fetching) {
        return (
            <div className="mx-auto flex min-h-[40vh] max-w-3xl items-center justify-center px-4 py-10">
                <div className="rounded-3xl border border-slate-200 bg-white/85 px-8 py-10 text-center shadow-sm">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Autores</p>
                    <p className="mt-2 text-slate-600">Cargando datos del autor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
            <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Autores</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        {id ? "Editar autor" : "Nuevo autor"}
                    </h1>
                    <p className="text-sm text-slate-600">
                        Completa los datos del autor para guardar o actualizar su ficha.
                    </p>
                </div>

                {message && (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6">
                    <fieldset disabled={loading} className="grid gap-5 border-0 p-0">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={author.name}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="surname" className="text-sm font-medium text-slate-700">
                                    Apellido
                                </label>
                                <input
                                    id="surname"
                                    name="surname"
                                    value={author.surname}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="nationality" className="text-sm font-medium text-slate-700">
                                    Nacionalidad
                                </label>
                                <input
                                    id="nationality"
                                    name="nationality"
                                    value={author.nationality}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="birthYear" className="text-sm font-medium text-slate-700">
                                    Año de nacimiento
                                </label>
                                <input
                                    id="birthYear"
                                    name="birthYear"
                                    type="number"
                                    value={author.birthYear}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                            <input
                                name="alive"
                                type="checkbox"
                                checked={author.alive}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                            />
                            ¿Vive?
                        </label>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
                            >
                                {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/authors")}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
}

export default AuthorForm;
