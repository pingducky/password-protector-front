import {getAxiosQuery} from "./Utils.ts";

export const getUserByEmail = async (email: string) => {
    return await getAxiosQuery(`users/${email}`);
}