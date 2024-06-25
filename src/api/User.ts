import { fetchWithoutAuth, getQuery, postQuery } from "../utils/apiUtils";


export const registerUser = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    return await postQuery<BasicResponse, UserCreateRequest>(`user/createAccount`, { firstName, lastName, username, email, password });
}

export const connectUser = async (username: string, password: string) => {
    return await fetchWithoutAuth<BasicResponse, UserConnectRequest>(`user/login`, { username, password });
}

export const resetPasswordSendMail = async (email: string) => {
    return await postQuery<BasicResponse>(`user/sendMailPasswordReset`, { mail: email });
}

export const resetPassword = async (token: string, password: string) => {
    return await postQuery<BasicResponse, UpdatePasswordRequest>(`user/changePassword`, {token, password});
}

export const getUserByEmail = async (email: string) => {
    return await getQuery<User>(`user/email/${email}`);
}
