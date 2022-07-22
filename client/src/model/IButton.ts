export interface IButton {
    type?: "submit" | "reset" | "button"
    height?: string
    className?: string
    callBack?: React.MouseEventHandler<HTMLButtonElement>
    label?: string
    disabled?: boolean
}
