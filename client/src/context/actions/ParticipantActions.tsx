import { useCallback } from "react"
import { IParticipant } from "../../model/IParticipant"

import Common from "./Common"
import { defaultState } from "../context"
import { ActionTypes } from "../reducer"

const ParticipantActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const { handleRequest } = Common(dispatch)

    const fetchFareParticipants = useCallback(
        (fareId: number) =>
            handleRequest(
                ActionTypes.GET_FARE_PARTICPANTS,
                {
                    method: "GET",
                    url: "/sharers",
                    params: {
                        fareId,
                    },
                },
                false
            ),
        [handleRequest]
    )

    const resetFareParticipants = useCallback(
        () =>
            dispatch({
                type: ActionTypes.RESET_FARE_PARTICPANTS,
                payload: { ...defaultState(false) },
            }),
        [dispatch]
    )

    const addFareParticipant = useCallback(
        async (participant: IParticipant, fareId: number) => {
            await handleRequest(
                ActionTypes.ADD_FARE_PARTICPANT,
                {
                    method: "POST",
                    url: `/sharers`,
                    data: participant,
                },
                false
            )
            fetchFareParticipants(fareId)
        },
        [handleRequest, fetchFareParticipants]
    )

    const removeFareParticipant = useCallback(
        async (id: number, fareId: number) => {
            await handleRequest(
                ActionTypes.REMOVE_FARE_PARTICPANT,
                {
                    method: "DELETE",
                    url: `/sharers/${id}`,
                },
                false
            )
            fetchFareParticipants(fareId)
        },
        [fetchFareParticipants, handleRequest]
    )
    return {
        fetchFareParticipants,
        resetFareParticipants,
        addFareParticipant,
        removeFareParticipant,
    }
}

export default ParticipantActions
