import { IButton } from "../../model/IButton"

const Button = ({
    type = "button",
    className = "",
    callBack = () => { },
    height = "12",
    label = <span>Button</span>,
    disabled = false,
}: IButton) => {
    return (
        <button
            type={type}
            className={`rounded-lg px-4 font-medium ${className} h-${height}`}
            onClick={callBack}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button
