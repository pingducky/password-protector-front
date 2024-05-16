import { getAxiosQuery } from './utils';


export const getUserByEmail = (email: string) => {
    getAxiosQuery(`users/${email}`);
}