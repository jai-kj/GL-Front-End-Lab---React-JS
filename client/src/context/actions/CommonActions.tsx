import { useCallback } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { defaultState } from "../context"

axios.defaults.baseURL = `http://localhost:5000`

const CommonActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const handleLoading = useCallback(
        (type: string, payload: any, status: boolean) =>
            dispatch({ type, payload: { ...payload, loading: status } }),
        [dispatch]
    )

    const handleError = useCallback(
        (type: string, payload: any, error: any) =>
            dispatch({ type, payload: { ...payload, error } }),
        [dispatch]
    )

    const handleRequest = useCallback(
        async (
            type: string,
            params: AxiosRequestConfig,
            isObject: boolean,
            objectProps?: any
        ) => {
            let result = { ...defaultState(isObject, objectProps) }
            handleLoading(type, result, true)
            try {
                const response = await axios.request(params)
                if (params?.method !== "DELETE") {
                    result.data = response?.data
                    dispatch({ type, payload: result })
                }
            } catch (err: any) {
                handleError(
                    type,
                    result,
                    axios?.isAxiosError(err)
                        ? `Axios Error with Message: ${err?.message}`
                        : err
                )
            } finally {
                handleLoading(type, result, false)
            }
        },
        [dispatch, handleLoading, handleError]
    )
    return {
        handleRequest,
    }
}

export default CommonActions
