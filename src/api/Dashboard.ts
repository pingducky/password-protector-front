import { getQuery } from "../utils/apiUtils"

export const getElementsByUsername = async (username: string) => {
    return await getQuery<BasicElement[]>(`elements/user/${username}`)
}
