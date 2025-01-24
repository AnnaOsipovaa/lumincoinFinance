export type ValidationType = {
    element: HTMLInputElement, 
    options: ValidationOptionsType
}

export type ValidationOptionsType = {
    pattern?: RegExp,
    compareTo?: string,
    notEqualTo?: string,
}