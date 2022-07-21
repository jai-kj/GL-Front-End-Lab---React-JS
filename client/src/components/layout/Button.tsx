import { IButton } from "../../model/IButton"

const Button = ({ type = "button", className = "", callBack, label = 'Button', disabled = false }: IButton) => {
    return (
        <button
            type={type}
            className={`rounded-lg px-4 h-12 font-medium ${className}`}
            onClick={callBack}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button