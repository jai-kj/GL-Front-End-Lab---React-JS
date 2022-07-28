import { useCallback } from "react"
import axios, { AxiosRequestConfig } from "axios"

import { defaultState } from "../context"
import { ActionTypes } from "../reducer"

axios.defaults.baseURL = `https://fair-share-backend.herokuapp.com`

const methodTypeAlerts: { [key: string]: string } = {
    POST: "Create Sucess!",
    PUT: "Update Sucess!",
    DELETE: "Delete Sucess!",
}

const CommonActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const setAlert = useCallback(
        (message: string, time: number = 5000) => {
            dispatch({ type: ActionTypes.SET_ALERT, payload: message })
            setTimeout(() => dispatch({ type: ActionTypes.RESET_ALERT }), time)
        },
        [dispatch]
    )

    const handleLoading = useCallback(
        (type: string, payload: any, status: boolean) =>
            dispatch({ type, payload: { ...payload, loading: status } }),
        [dispatch]
    )

    const handleError = useCallback(
        (type: string, payload: any, error: any) => {
            setAlert(error)
            dispatch({ type, payload: { ...payload, error } })
        },
        [dispatch, setAlert]
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
                if (methodTypeAlerts[params?.method ?? ""])
                    setAlert(methodTypeAlerts[params?.method ?? ""])
            } catch (err: any) {
                handleError(
                    type,
                    result,
                    axios?.isAxiosError(err)
                        ? `${err?.request?.statusText ?? err?.message}`
                        : err
                )
            } finally {
                handleLoading(type, result, false)
            }
        },
        [dispatch, handleLoading, handleError, setAlert]
    )

    return {
        handleRequest,
        setAlert,
    }
}

export default CommonActions
