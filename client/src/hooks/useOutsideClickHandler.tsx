import { useEffect, useRef } from "react"

const useOutsideClickHandler = (callBack: Function) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) callBack()
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick)
    }, [ref, callBack])

    return {
        ref,
    }
}

export default useOutsideClickHandler
