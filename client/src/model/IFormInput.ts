export interface IFormInput {
    id: string
    label: string
    type?: string
    placeholder: string
    inputRef: React.RefObject<HTMLInputElement>
    inputError: boolean
    inputExit: React.FocusEventHandler<HTMLInputElement>
    inputErrorMsg: string
    max?: string
}
