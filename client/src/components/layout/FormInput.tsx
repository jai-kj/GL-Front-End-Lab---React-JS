import { IFormInput } from "../../model/IFormInput"

const FormInput = ({
    id,
    label,
    type = "text",
    placeholder,
    inputError,
    inputRef,
    inputErrorMsg,
    inputExit,
    max = ''
}: IFormInput) => {
    return (
        <div className='form-control flex flex-col w-full'>
            <label htmlFor={id} className='p-2'>
                {label}
            </label>
            <div className='flex flex-col'>
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className={`w-full h-12 bg-dark px-3 rounded-md border-2 ${inputError
                        ? "border-red-400 outline-none"
                        : "border-transparent"
                        }`}
                    step="any"
                    autoComplete="off"
                    ref={inputRef}
                    max={max}
                    onBlur={inputExit}
                />
                <p className='text-red-300 h-8 px-2 text-xxs sm:text-xs pt-1'>
                    {inputErrorMsg}
                </p>
            </div>
        </div>
    )
}

export default FormInput
