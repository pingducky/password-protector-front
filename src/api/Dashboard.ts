import { getQuery } from "../utils/apiUtils"

export const getElementsByUsername = async (username: string) => {
    return getQuery<BasicElement[]>(`elements/user/${username}`)
}
