const baseURL = import.meta.env.VITE_BASE_URL;

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function getQuery<T>(url: string) {
    return createQuery<T, never>(url, Method.GET)
}

export async function postQuery<T, K>(url: string, body: K) {
    return createQuery<T, K>(url, Method.POST, body);
}

export async function putQuery<T, K>(url: string, body?: K) {
    return createQuery<T, K>(url, Method.PUT, body);
}

export async function deleteQuery<T>(url: string) {
    return createQuery<T, never>(url, Method.DELETE)
}

async function createQuery<R, B>(url: string, method: Method, body?: B) {
    const response = await fetchAPI<R, B>(url, method, body)

    if (response.status === 403) {
        const refreshTokenResponse = await fetchAPI<BasicResponse, never>("user/refreshToken", Method.POST)

        return refreshTokenResponse.ok ? await fetchAPI<R, B>(url, method, body) : refreshTokenResponse
    } else {
        return response
    }
}

async function getResult<T>(res: Response) {
    return {
        status: res.status,
        ok: res.ok,
        data: res.ok ? await res.json() : {} as T
    } as APIResponse<T>
}

async function fetchAPI<R, B>(url: string, method: Method, body?: B) {
    const response = await fetch(`${baseURL}${url}`, {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await getResult<R>(response);
}

export async function fetchWithoutAuth<R, B>(url: string, body: B) {
    return await fetchAPI<R, B>(url, Method.POST, body)
}