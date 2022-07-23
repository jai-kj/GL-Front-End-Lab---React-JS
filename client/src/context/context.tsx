import { createContext, useContext, useMemo, useReducer } from "react"
import { reducer } from "./reducer"

import { Ifare } from "./../model/Ifare"
import { IExpense } from "../model/IExpense"

import FareActions from "./actions/FareActions"
import ParticipantActions from "./actions/ParticipantActions"
import ExpenseActions from "./actions/ExpenseActions"

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

export const expenseType: IExpense = {
    id: null,
    title: null,
    amount: null,
    fareId: null,
    sharerId: null,
    sharedBetween: [],
    category: null,
    date: null,
}

const initialState = {
    fareList: { ...defaultState(false) },
    fare: { ...defaultState(true, fareType) },
    participants: { ...defaultState(false) },
    expenseList: { ...defaultState(false) },
    expense: { ...defaultState(true, expenseType) },
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

    const {
        fetchFares,
        getFare,
        setFare,
        resetFare,
        addFare,
        updateFare,
        deleteFare,
        getFareFromFareList,
    } = FareActions(dispatch)

    const {
        fetchFareParticipants,
        resetFareParticipants,
        addFareParticipant,
        removeFareParticipant,
    } = ParticipantActions(dispatch)

    const {
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        setExpense,
        resetExpense,
    } = ExpenseActions(dispatch)

    return useMemo(
        () => ({
            fetchFares,
            getFare,
            setFare,
            resetFare,
            addFare,
            updateFare,
            deleteFare,
            getFareFromFareList,
            fetchFareParticipants,
            resetFareParticipants,
            addFareParticipant,
            removeFareParticipant,
            fetchExpenses,
            addExpense,
            updateExpense,
            deleteExpense,
            setExpense,
            resetExpense,
        }),
        [
            fetchFares,
            getFare,
            setFare,
            resetFare,
            addFare,
            updateFare,
            deleteFare,
            getFareFromFareList,
            fetchFareParticipants,
            resetFareParticipants,
            addFareParticipant,
            removeFareParticipant,
            fetchExpenses,
            addExpense,
            updateExpense,
            deleteExpense,
            setExpense,
            resetExpense,
        ]
    )
}
