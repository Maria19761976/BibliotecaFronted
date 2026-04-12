export function ensureArrayResponse(data, resourceName) {
    if (!Array.isArray(data)) {
        throw new Error(`La API devolvio una respuesta invalida al cargar ${resourceName}.`);
    }

    return data;
}

export function ensureObjectResponse(data, resourceName) {
    if (!data || Array.isArray(data) || typeof data !== "object") {
        throw new Error(`La API devolvio una respuesta invalida al cargar ${resourceName}.`);
    }

    return data;
}

export function getApiErrorMessage(error, fallbackMessage) {
    const responseData = error?.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData.trim();
    }

    if (typeof responseData?.message === "string" && responseData.message.trim()) {
        return responseData.message.trim();
    }

    if (typeof responseData?.error === "string" && responseData.error.trim()) {
        return responseData.error.trim();
    }

    if (Array.isArray(responseData?.errors)) {
        const errors = responseData.errors
            .map((entry) => {
                if (typeof entry === "string") {
                    return entry.trim();
                }

                if (typeof entry?.message === "string") {
                    return entry.message.trim();
                }

                return "";
            })
            .filter(Boolean)
            .join(" ");

        if (errors) {
            return errors;
        }
    }

    if (typeof error?.message === "string" && error.message.trim()) {
        return error.message.trim();
    }

    return fallbackMessage;
}
