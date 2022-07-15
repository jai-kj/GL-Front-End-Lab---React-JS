import {useCallback, useEffect, useRef, useState} from "react"
import {IInput} from "../model/IInput"

const useInputRef = ({initialState = '', regex = /./, regexCheck = false}: IInput) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputError, setInputError] = useState(false)

    const handleInputBlur = useCallback(
        () =>
            regexCheck &&
                (!inputRef?.current?.value ||
                    !inputRef?.current?.value?.trim() ||
                    !inputRef?.current?.value?.match(regex))
                ? setInputError(true)
                : setInputError(false),
        [regex, regexCheck]
    )

    useEffect(() => {
        if (initialState && inputRef?.current)
            inputRef.current.value = initialState
    }, [initialState])

    return {
        inputRef,
        inputError,
        handleInputBlur
    }
}

export default useInputRef
