import { useCallback } from "react"
import { IExpense } from "../../model/IExpense"

import { defaultState, expenseType } from "../context"
import { ActionTypes } from "../reducer"
import CommonActions from "./CommonActions"

const ExpenseActions = (
    dispatch: React.Dispatch<{ type: string; payload?: unknown }>
) => {
    const { handleRequest } = CommonActions(dispatch)

    const fetchExpenses = useCallback(
        (fareId: number) =>
            handleRequest(
                ActionTypes.GET_EXPENSES_OF_FARE,
                {
                    method: "GET",
                    url: "/expenses",
                    params: {
                        fareId,
                        _sort: "id",
                        _order: "desc",
                    },
                },
                false
            ),
        [handleRequest]
    )

    const resetExpenseList = useCallback(
        () =>
            dispatch({
                type: ActionTypes.RESET_EXPENSES_OF_FARE,
                payload: { ...defaultState(false) },
            }),
        [dispatch]
    )

    const addExpense = useCallback(
        async (fareId: number, expense: IExpense) => {
            await handleRequest(
                ActionTypes.ADD_EXPENSE,
                {
                    method: "POST",
                    url: "/expenses",
                    data: expense,
                },
                true,
                expense
            )
            fetchExpenses(fareId)
        },
        [handleRequest, fetchExpenses]
    )

    const updateExpense = useCallback(
        async (fareId: number, expenseId: number, expense: IExpense) => {
            await handleRequest(
                ActionTypes.UPDATE_EXPENSE,
                {
                    method: "PUT",
                    url: `/expenses/${expenseId}`,
                    data: expense,
                },
                true,
                expense
            )
            fetchExpenses(fareId)
        },
        [handleRequest, fetchExpenses]
    )

    const deleteExpense = useCallback(
        async (fareId: number, expenseId: number) => {
            await handleRequest(
                ActionTypes.DELETE_EXPENSE,
                {
                    method: "DELETE",
                    url: `/expenses/${expenseId}`,
                },
                true,
                expenseType
            )
            fetchExpenses(fareId)
        },
        [handleRequest, fetchExpenses]
    )

    const setExpense = useCallback(
        (expense: IExpense) =>
            dispatch({
                type: ActionTypes.SET_EXPENSE,
                payload: { ...defaultState(true, expense) },
            }),
        [dispatch]
    )

    const resetExpense = useCallback(
        () =>
            dispatch({
                type: ActionTypes.RESET_EXPENSE,
                payload: { ...defaultState(true, expenseType) },
            }),
        [dispatch]
    )

    return {
        fetchExpenses,
        resetExpenseList,
        addExpense,
        updateExpense,
        deleteExpense,
        setExpense,
        resetExpense,
    }
}

export default ExpenseActions
