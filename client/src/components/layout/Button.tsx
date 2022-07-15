import { IButton } from "../../model/IButton"

const Button = ({ type = "button", className = "", callBack, label = 'Button' }: IButton) => {
    return (
        <button
            type={type}
            className={`rounded-lg px-4 h-12 font-medium ${className}`}
            onClick={callBack}
        >
            {label}
        </button>
    )
}

export default Button