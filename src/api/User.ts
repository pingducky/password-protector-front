<<<<<<< HEAD
=======
import {fetchWithoutAuth, getQuery, postQuery} from "../utils/apiUtils.ts";

export const registerUser = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    return await postQuery<BasicResponse, UserCreateRequest>(`user/createAccount`, {firstName, lastName, username, email, password});
}
>>>>>>> origin/main

export const connectUser = async (username: string, password: string) => {
    return await fetchWithoutAuth<BasicResponse, UserConnectRequest>(`user/login`, { username, password });
}

export const getUserByEmail = async (email: string) => {
    return await getQuery<User>(`user/email/${email}`);
}
