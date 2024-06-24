import {getQuery} from "../utils/apiUtils.ts";

function emptyElement() {
    return {
        id: "",
        name: "",
        url: "",
        description: "",
        user: emptyUser(),
        passwords: [],
        passwordCount: 0,
        type: emptyType(),
        creationDate: new Date().toISOString(),
        modificationDate: null
    } as Element;
}

function emptyType() {
    return {
        id: "",
        name: ""
    } as BasicType;
}

function emptyUser() {
    return {
        username: "",
        elementCount: 0
    } as BasicUser;
}

async function getPassword(id: string) {
    return await getQuery<OnlyPassword>("showPassword/" + id);
}

async function getTypes() {
    return await getQuery<BasicType[]>("types/user/" + localStorage.getItem('username'));
}

async function getElementByID(id: string) {
    return await getQuery<Element>("element/id/" + id);
}

export {emptyElement, getPassword, getTypes, getElementByID};