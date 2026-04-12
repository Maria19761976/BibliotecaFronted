import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiErrorMessage } from "../../services/apiUtils";
import { createAuthor, getAuthorById, updateAuthor } from "../../services/authorService";

const feedbackStyles = {
    error: "border-rose-200 bg-rose-50 text-rose-900",
};

function AuthorForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [feedback, setFeedback] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [author, setAuthor] = useState({
        name: "",
        surname: "",
        nationality: "",
        birthYear: "",
        image: "",
        alive: true,
    });

    const loadAuthor = useCallback(async () => {
        try {
            setFetching(true);
            setLoadError(false);
            setFeedback({ type: "", text: "" });

            const authorData = await getAuthorById(id);
            setAuthor({
                name: authorData.name || "",
                surname: authorData.surname || "",
                nationality: authorData.nationality || "",
                birthYear: authorData.birthYear || "",
                image: authorData.image || "",
                alive: authorData.alive !== undefined ? authorData.alive : true,
            });
        } catch (error) {
            setLoadError(true);
            setFeedback({
                type: "error",
                text: getApiErrorMessage(error, "No se pudo cargar la información del autor. Inténtalo de nuevo."),
            });
        } finally {
            setFetching(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            loadAuthor();
        }
    }, [id, loadAuthor]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setAuthor({ ...author, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const normalizedAuthor = {
            name: author.name.trim(),
            surname: author.surname.trim(),
            nationality: author.nationality.trim(),
            birthYear: author.birthYear.toString().trim(),
            image: author.image.trim(),
            alive: author.alive,
        };

        if (
            !normalizedAuthor.name ||
            !normalizedAuthor.surname ||
            !normalizedAuthor.nationality ||
            !normalizedAuthor.birthYear
        ) {
            setFeedback({
                type: "error",
                text: "Completa todos los campos obligatorios antes de guardar.",
            });
            return;
        }

        const parsedBirthYear = Number(normalizedAuthor.birthYear);

        if (!Number.isInteger(parsedBirthYear) || parsedBirthYear <= 0) {
            setFeedback({
                type: "error",
                text: "El año de nacimiento debe ser un número válido.",
            });
            return;
        }

        const authorPayload = {
            ...normalizedAuthor,
            birthYear: parsedBirthYear,
        };

        try {
            setLoading(true);
            setFeedback({ type: "", text: "" });

            if (id) {
                await updateAuthor(id, authorPayload);
                navigate("/authors", {
                    replace: true,
                    state: { feedback: { type: "success", text: "Autor actualizado correctamente." } },
                });
                return;
            }

            await createAuthor(authorPayload);
            navigate("/authors", {
                replace: true,
                state: { feedback: { type: "success", text: "Autor creado correctamente." } },
            });
        } catch (error) {
            setFeedback({
                type: "error",
                text: getApiErrorMessage(error, "No se pudo guardar el autor. Revisa los datos e inténtalo de nuevo."),
            });
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

    if (loadError) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
                <section className="rounded-3xl border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-700">Autores</p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                        No se pudo abrir este autor
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Comprueba la conexión o vuelve al listado para continuar con otra acción.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={loadAuthor}
                            className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                        >
                            Reintentar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/authors")}
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                        >
                            Volver al listado
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
            <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500" />
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Autores</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        {id ? "Editar autor" : "Nuevo autor"}
                    </h1>
                    <p className="text-sm text-slate-600">
                        {id
                            ? "Actualiza la ficha del autor y guarda los cambios cuando esté todo revisado."
                            : "Completa los datos del autor para crear un nuevo registro en la biblioteca."}
                    </p>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Los campos de nombre, apellido, nacionalidad y año de nacimiento son obligatorios.
                </div>

                {feedback.text && (
                    <div
                        role="alert"
                        className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                            feedbackStyles[feedback.type] || "border-slate-200 bg-white text-slate-700"
                        }`}
                    >
                        <p className="font-medium">No se pudo completar la acción.</p>
                        <p className="mt-1">{feedback.text}</p>
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
                                    required
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
                                    required
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
                                    required
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
                                    min="1"
                                    step="1"
                                    required
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium text-slate-700">
                                URL de la imagen
                            </label>
                            <input
                                id="image"
                                name="image"
                                value={author.image}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                            />
                        </div>

                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                            <input
                                name="alive"
                                type="checkbox"
                                checked={author.alive}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                            />
                            Vive actualmente
                        </label>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
                            >
                                {loading ? "Guardando..." : id ? "Guardar cambios" : "Crear autor"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/authors")}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                            >
                                Volver al listado
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
}

export default AuthorForm;
