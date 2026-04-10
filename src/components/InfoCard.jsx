function InfoCard({ title, imageUrl, fields = [], onEdit, onDelete }) {
    return (
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
            {imageUrl ? (
                <img
                    className="h-44 w-full object-cover"
                    src={imageUrl}
                    alt={title}
                />
            ) : (
                <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
                    Sin imagen
                </div>
            )}

            <div className="space-y-4 p-5">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
                    <div className="h-1 w-16 rounded-full bg-emerald-600" />
                </div>

                <ul className="grid gap-2 text-sm text-slate-600">
                    {fields.map((field) => (
                        <li key={field.label} className="rounded-2xl bg-slate-50 px-3 py-2">
                            <strong className="text-slate-800">{field.label}:</strong> {field.value}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row">
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex-1 rounded-2xl bg-emerald-700 px-4 py-2.5 font-medium text-white transition-colors hover:bg-emerald-800"
                >
                    Editar
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="flex-1 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 font-medium text-rose-700 transition-colors hover:bg-rose-100"
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
}

export default InfoCard;
