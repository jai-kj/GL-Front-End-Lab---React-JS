export interface IButton {
    type?: "submit" | "reset" | "button"
    className?: string
    callBack: React.MouseEventHandler<HTMLButtonElement>
    label?: string
}
