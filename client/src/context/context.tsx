import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react"
import { ActionTypes, reducer } from "./reducer"
import axios, { AxiosRequestConfig } from "axios"

const defaultStates = {
    loading: true,
    data: [],
    error: null,
}

const initialState = {
    fareList: { ...defaultStates },
    fare: {
        id: null,
        title: null,
        date: null
    },
    participants: { ...defaultStates },
}

const StateContext = createContext(initialState)
const DispatchContext = createContext<
    React.Dispatch<{ type: string; payload?: unknown }> | undefined
>(undefined)

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export const useUIState = () => useContext(StateContext)
export const useUIDispatch = () => {
    const dispatch = useContext(DispatchContext)

    if (!dispatch) throw new Error("Use dispatch within a Dispatch Provider")

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
        async (type: string, params: AxiosRequestConfig) => {
            let result = { ...defaultStates }
            handleLoading(type, result, true)
            try {
                const response = await axios.request(params)
                result.data = response?.data
                dispatch({ type, payload: result })
            } catch (err) {
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

    const fetchFares = useCallback(
        () =>
            handleRequest(ActionTypes.GET_FARES, {
                method: "GET",
                url: "/fares",
                params: {
                    _sort: "id",
                    _order: "desc",
                },
            }),
        [handleRequest]
    )

    const fetchFareParticipants = useCallback(
        (fareId: number) =>
            handleRequest(ActionTypes.GET_FARE_PARTICPANTS, {
                method: "GET",
                url: "/sharers",
                params: {
                    fareId,
                },
            }),
        [handleRequest]
    )

    const setFare = useCallback(
        (fare: any) => dispatch({ type: ActionTypes.SET_FARE, payload: fare }),
        [dispatch]
    )

    const resetFare = useCallback(
        () => dispatch({ type: ActionTypes.RESET_FARE }),
        [dispatch]
    )

    return useMemo(
        () => ({
            fetchFares,
            fetchFareParticipants,
            setFare,
            resetFare,
        }),
        [fetchFares, fetchFareParticipants, setFare, resetFare]
    )
}
