import { useCallback, useEffect, useRef, useState } from "react"
import { IInput } from "../model/IInput"

const useInputRef = ({
    initialState = "",
    regex = /./,
    regexCheck = false,
    defaultErrorMsg = "",
}: IInput) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputError, setInputError] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>("")

    const handleError = useCallback((isError = false, errMsg = "") => {
        setInputError(isError)
        setErrorMsg(errMsg)
    }, [])

    const handleInputBlur = useCallback(() => {
        if (inputRef?.current?.value === "") handleError()
        else {
            if (inputRef?.current?.value?.trim() === "")
                handleError(true, defaultErrorMsg)
            else if (regexCheck && inputRef?.current?.value?.match(regex))
                handleError()
            else if (regexCheck) handleError(true, defaultErrorMsg)
        }
    }, [regex, regexCheck, defaultErrorMsg, handleError])

    const onUpdate = useCallback((value = "", error = false, errMsg = "") => {
        if (inputRef?.current) inputRef.current.value = value
        setInputError(error)
        setErrorMsg(errMsg)
    }, [])

    useEffect(() => {
        if (initialState && inputRef?.current)
            inputRef.current.value = initialState
    }, [initialState])

    return {
        inputRef,
        inputError,
        errorMsg,
        handleInputBlur,
        onUpdate,
        handleError,
    }
}

export default useInputRef
