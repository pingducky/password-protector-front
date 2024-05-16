import axios, { AxiosResponse } from "axios";

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

interface ApiDataType<T> {
    message: string
    status: number
    object?: T,
    objectList?: T[]
    token?: string
    insertedID?: string
}

export async function getAxiosQuery<T>(url: string) {
    return createAxiosQuery<T, never>(url, Method.GET)
}

export async function postAxiosQuery<T, K extends keyof T>(url: string, body: Pick<T, K>) {
    return createAxiosQuery<T, K>(url, Method.POST, body);
}

export async function putAxiosQuery<T, K extends keyof T>(url: string, body?: Pick<T, K>) {
    return createAxiosQuery<T, K>(url, Method.PUT, body);
}

export async function deleteAxiosQuery<T>(url: string) {
    return createAxiosQuery<T, never>(url, Method.DELETE)
}

async function createAxiosQuery<T, K extends keyof T>(url: string, method: Method, body?: Pick<T, K>) {
    const config = {
        method: method,
        url: `${import.meta.env.VITE_API_URL}${url}`,
        data: body,
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        // },
    };

    return await axios(config) as AxiosResponse<ApiDataType<T>>
}