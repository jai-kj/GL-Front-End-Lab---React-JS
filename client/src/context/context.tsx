import { createContext, useContext, useMemo, useReducer } from "react"
import { reducer } from "./reducer"

import { Ifare } from "./../model/Ifare"

import FareActions from "./actions/FareActions"
import ParticipantActions from "./actions/ParticipantActions"

export const defaultState = (isObject: boolean, objectProps?: any) => ({
    loading: false,
    data: !isObject ? [] : { ...objectProps },
    error: null,
})

export const fareType: Ifare = {
    id: 0,
    title: null,
    date: null,
}

const initialState = {
    fareList: { ...defaultState(false) },
    fare: { ...defaultState(true, fareType) },
    participants: { ...defaultState(false) },
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

    const { fetchFares, setFare, resetFare, addFare, updateFare, deleteFare } =
        FareActions(dispatch)

    const {
        fetchFareParticipants,
        resetFareParticipants,
        addFareParticipant,
        removeFareParticipant,
    } = ParticipantActions(dispatch)

    return useMemo(
        () => ({
            fetchFares,
            setFare,
            resetFare,
            addFare,
            updateFare,
            deleteFare,
            fetchFareParticipants,
            resetFareParticipants,
            addFareParticipant,
            removeFareParticipant,
        }),
        [
            fetchFares,
            setFare,
            resetFare,
            addFare,
            updateFare,
            deleteFare,
            fetchFareParticipants,
            resetFareParticipants,
            addFareParticipant,
            removeFareParticipant,
        ]
    )
}
