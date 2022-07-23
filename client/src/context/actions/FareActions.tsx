import { useCallback } from "react"
import { Ifare } from "./../../model/Ifare"

import CommonActions from "./CommonActions"
import { defaultState, fareType } from "../context"
import { ActionTypes } from "../reducer"

const FareActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const { handleRequest } = CommonActions(dispatch)

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

    const getFare = useCallback(
        (fareId: number) =>
            handleRequest(
                ActionTypes.GET_FARE,
                {
                    method: "GET",
                    url: `/fares/${fareId}`,
                },
                true,
                fareType
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

    const getFareFromFareList = useCallback(
        (fareId: number) =>
            dispatch({
                type: ActionTypes.GET_FARE_FROM_FARE_LIST,
                payload: {
                    fareType,
                    fareId,
                },
            }),
        [dispatch]
    )

    return {
        fetchFares,
        getFare,
        setFare,
        resetFare,
        addFare,
        updateFare,
        deleteFare,
        getFareFromFareList,
    }
}

export default FareActions
