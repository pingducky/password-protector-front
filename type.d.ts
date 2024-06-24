interface APIResponse<T> {
    status: number
    ok: boolean
    data: T
}

interface BasicResponse {
    message: string
}

/* Request */

//Element
interface ElementUpdateRequest {
    name: string
    url: string
    description?: string
    typeID?: string
}

interface ElementCreateRequest extends ElementUpdateRequest {
    username: string
}

//Password
interface PasswordUpdateRequest {
    identifier: string
    password: string
    comment?: string
}

interface PasswordCreateRequest extends PasswordUpdateRequest {
    elementID: string
}

//Type
interface TypeRequest {
    name: string
    username: string
}

//User
interface RefreshTokenRequest {
    id: string
    token: string
    refreshToken: string
}

interface UserName {
    username: string
}

interface UserUpdateRequest extends UserName {
    firstName: string
    lastName: string
    email: string
}

interface UserCreateRequest extends UserUpdateRequest {
    password: string
}

interface UserConnectRequest extends UserName {
    password: string
}



/* Response */
interface Response {
    data: {
        message: string
    }
}

interface Date {
    creationDate: string
    modificationDate: string
}

//Element
interface BasicElement {
    id: string
    name: string
    url: string
    passwordCount: number
}

interface Element extends BasicElement, Date {
    description: string
    user: BasicUser
    passwords: Array<BasicPassword>
    type: BasicType
}


//User
interface BasicUser {
    username: string
    elementCount: number
}

interface User extends BasicUser, Date {
    firstName: string
    lastName: string
    email: string
    elements: Array<BasicElement>
}


//Password & Token
interface BasicPassword {
    id: string
    identifier: string
    comment: string
}

interface Password extends BasicPassword, Element {
    element: BasicElement
}

interface OnlyPassword {
    password: string
}

interface Token {
    token: string
    refreshToken: string
}

//Type
interface BasicType {
    id: string
    name: string
}

interface Type extends BasicType, Date {
    user: BasicUser
}


//Props
interface BackHeaderProps {
    title: string,
    backURL: string
}

interface TextFieldProps {
    label: string
    placeholder: string
    isRequired?: boolean | false
    value?: string
    error?: ErrorProps
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface ErrorProps {
    errorMessage: string
    errorFunction: (value: string) => boolean
}