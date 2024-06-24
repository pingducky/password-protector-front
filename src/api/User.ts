import { fetchWithoutAuth, getQuery } from "../utils/apiUtils.ts";

export const connectUser = async (username: string, password: string) => {
    return await fetchWithoutAuth<BasicResponse, UserConnectRequest>(`user/login`, { username, password });
}

export const getUserByEmail = async (email: string) => {
    return await getQuery<User>(`user/email/${email}`);
}