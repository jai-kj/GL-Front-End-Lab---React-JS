import { useCallback, useMemo } from "react"

const useMiscellaneous = () => {
    const truncateString = useCallback(
        (str: string | null, num: number = 25) =>
            str && str.length > num ? str.slice(0, num) + "..." : str,
        []
    )

    const formatDateToString = useCallback(
        (dateStr: string, callBack: Function) => {
            if (!dateStr) return

            const dateObj = new Date(dateStr)

            callBack(
                `${dateObj.getFullYear()}-${`${dateObj.getMonth() + 1
                    }`.padStart(2, "0")}-${`${dateObj.getDate()}`.padStart(2, "0")}`
            )
        },
        []
    )
    return useMemo(
        () => ({
            truncateString,
            formatDateToString,
        }),
        [truncateString, formatDateToString]
    )
}

export default useMiscellaneous
