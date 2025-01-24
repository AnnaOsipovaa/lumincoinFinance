export type LoginResponseErrorType = {
    error: boolean,
    message: string,
    validation: ValidationType[]
}

type ValidationType = {
    key: string,
    message: string
}