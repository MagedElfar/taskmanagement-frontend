export function apiErrorFormat(error: any): any[] | any {
    if (Array.isArray(error?.response?.data?.message)) {
        return error.response.data.message
    }

    if (error?.response?.data?.message) {
        return [error.response.data.message]
    }

    if (error?.message) {
        return [error.message]
    }

    return []
}