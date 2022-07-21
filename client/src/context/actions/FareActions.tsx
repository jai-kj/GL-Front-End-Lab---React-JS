import { useCallback } from "react"
import { Ifare } from "./../../model/Ifare"

import Common from "./Common"
import { defaultState, fareType } from "../context"
import { ActionTypes } from "../reducer"

const FareActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const { handleRequest } = Common(dispatch)

    const fetchFares = useCallback(
        () =>
            handleRequest(
                ActionTypes.GET_FARES,
                {
                    method: "GET",
                    url: "/fares",
                    params: {
                        _sort: "id",
                        _order: "desc",
                    },
                },
                false
            ),
        [handleRequest]
    )

    const setFare = useCallback(
        (fare: Ifare) =>
            dispatch({
                type: ActionTypes.SET_FARE,
                payload: { ...defaultState(true, fare) },
            }),
        [dispatch]
    )

    const resetFare = useCallback(
        () =>
            dispatch({
                type: ActionTypes.RESET_FARE,
                payload: { ...defaultState(true, fareType) },
            }),
        [dispatch]
    )

    const addFare = useCallback(
        async (fare: Ifare) => {
            await handleRequest(
                ActionTypes.ADD_FARE,
                {
                    method: "POST",
                    url: "/fares",
                    data: fare,
                },
                true,
                fare
            )
            fetchFares()
        },
        [handleRequest, fetchFares]
    )

    const updateFare = useCallback(
        async (fare: Ifare, fareId: number) => {
            await handleRequest(
                ActionTypes.UPDATE_FARE,
                {
                    method: "PUT",
                    url: `/fares/${fareId}`,
                    data: fare,
                },
                true,
                fare
            )
            fetchFares()
        },
        [handleRequest, fetchFares]
    )

    const deleteFare = useCallback(
        async (fareId: number) => {
            await handleRequest(
                ActionTypes.REMOVE_FARE,
                {
                    method: "DELETE",
                    url: `/fares/${fareId}`,
                },
                true,
                fareType
            )
            fetchFares()
        },
        [handleRequest, fetchFares]
    )

    return {
        fetchFares,
        setFare,
        resetFare,
        addFare,
        updateFare,
        deleteFare,
    }
}

export default FareActions
