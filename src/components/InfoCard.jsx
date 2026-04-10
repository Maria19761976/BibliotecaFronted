import "./InfoCard.css";

function InfoCard({ title, imageUrl, fields = [], onEdit, onDelete }) {
    return (
        <article className="info-card">
            {imageUrl ? (
                <img className="info-card__image" src={imageUrl} alt={title} />
            ) : (
                <div className="info-card__image info-card__image--placeholder">
                    No image
                </div>
            )}

            <div className="info-card__body">
                <h3>{title}</h3>
                <ul className="info-card__fields">
                    {fields.map((field) => (
                        <li key={field.label}>
                            <strong>{field.label}:</strong> {field.value}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="info-card__actions">
                <button type="button" onClick={onEdit}>
                    Edit
                </button>
                <button type="button" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default InfoCard;
