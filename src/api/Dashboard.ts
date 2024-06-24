import { deleteQuery, getQuery } from "../utils/apiUtils"

export const getElementsByUsername = async (username: string) => {
    return await getQuery<BasicElement[]>(`elements/user/${username}`)
}

export const deleteElementById = async (userName: string, elementId: string) => {
    return await deleteQuery(`element/user/${userName}/id/${elementId}`)
}