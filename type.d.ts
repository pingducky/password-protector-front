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
    name?: string
    url?: string
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

interface SharePasswordRequest  {
    email: string
    username: string
    passwordId: string
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

interface UpdatePasswordRequest {
    token: string
    password: string
}

interface SendMailRequest {
    mail: string
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
interface BasicElement extends Date {
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

interface InputProps {
    label: string
    isRequired?: boolean | false
    disabled?: boolean | false
    value?: string
    error?: ErrorProps
    onChange: (value: string) => void
}

interface TextInputProps extends InputProps {
    placeholder: string
}

interface SelectInputProps extends InputProps {
    options: Array<string>
}

interface ErrorProps {
    errorMessage: string
    errorFunction: (value: string) => boolean
}

interface EditLineProps {
    identifier: string
    password: string
    setIdentifier: (value: string) => void
    setPassword: (value: string) => void
    savePassword: () => void
}

interface BasicLineProps {
    id: string
    identifier: string
    editable: boolean
    setEditable: () => void
}