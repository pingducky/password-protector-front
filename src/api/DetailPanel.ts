import {fetchWithoutAuth, getQuery, postQuery, putQuery} from "../utils/apiUtils.ts";

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

export async function sendSharePasswordEmail(email: string, username: string, passwordId: string) {
    return await postQuery<BasicResponse, SharePasswordRequest>("password/share", {email, username, passwordId});
}

async function createElement() {
    return await postQuery<BasicResponse, ElementCreateRequest>("element", {
        name: "",
        url: "",
        description: "",
        typeID: "",
        username: localStorage.getItem("username")
    })
}

async function updateElement(element: ElementUpdateRequest, id: string) {
    return await putQuery<BasicResponse, ElementUpdateRequest>("element/" + id, element)
}

async function savePassword(password: PasswordCreateRequest) {
    return await postQuery<BasicResponse, PasswordCreateRequest>("password", password)
}

async function updatePassword(password: PasswordUpdateRequest, id: string) {
    return await putQuery<BasicResponse, PasswordUpdateRequest>("password/id/" + id, password)
}

export {
    sendSharePasswordEmail,
    emptyElement,
    getPassword,
    getTypes,
    createElement,
    savePassword,
    updatePassword,
    updateElement,
    getElementByID
};