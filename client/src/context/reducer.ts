import { Ifare } from "./../model/Ifare"

export const ActionTypes = {
    GET_FARES: "GET_FARES",
    GET_FARE: "GET_FARE",
    SET_FARE: "SET_FARE",
    RESET_FARE: "RESET_FARE",
    ADD_FARE: "ADD_FARE",
    UPDATE_FARE: "UPDATE_FARE",
    REMOVE_FARE: "REMOVE_FARE",
    GET_FARE_FROM_FARE_LIST: "GET_FARE_FROM_FARE_LIST",
    GET_FARE_PARTICPANTS: "GET_FARE_PARTICPANTS",
    RESET_FARE_PARTICPANTS: "RESET_FARE_PARTICPANTS",
    ADD_FARE_PARTICPANT: "ADD_FARE_PARTICPANT",
    REMOVE_FARE_PARTICPANT: "REMOVE_FARE_PARTICPANT",
    GET_EXPENSES_OF_FARE: "GET_EXPENSES_OF_FARE",
    RESET_EXPENSES_OF_FARE: "RESET_EXPENSES_OF_FARE",
    ADD_EXPENSE: "ADD_EXPENSE",
    UPDATE_EXPENSE: "UPDATE_EXPENSE",
    DELETE_EXPENSE: "DELETE_EXPENSE",
    SET_EXPENSE: "SET_EXPENSE",
    RESET_EXPENSE: "RESET_EXPENSE",
    SET_ALERT: "SET_ALERT",
    RESET_ALERT: "RESET_ALERT",
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.GET_FARES:
            return { ...state, fareList: action?.payload }

        case ActionTypes.GET_FARE_PARTICPANTS:
        case ActionTypes.RESET_FARE_PARTICPANTS:
            return { ...state, participants: action?.payload }

        case ActionTypes.SET_FARE:
        case ActionTypes.GET_FARE:
        case ActionTypes.ADD_FARE:
        case ActionTypes.UPDATE_FARE:
        case ActionTypes.REMOVE_FARE:
        case ActionTypes.RESET_FARE:
            return { ...state, fare: action?.payload }

        case ActionTypes.GET_FARE_FROM_FARE_LIST:
            const fares = state?.fareList?.data?.filter(
                (fareObj: Ifare) => fareObj.id === action?.payload?.fareId
            )
            const fare = {
                ...state?.fare,
                data: fares?.length > 0 ? fares[0] : action?.payload?.fareType,
            }
            return { ...state, fare }

        case ActionTypes.GET_EXPENSES_OF_FARE:
        case ActionTypes.RESET_EXPENSES_OF_FARE:
            return { ...state, expenseList: action?.payload }

        case ActionTypes.ADD_EXPENSE:
        case ActionTypes.UPDATE_EXPENSE:
        case ActionTypes.DELETE_EXPENSE:
        case ActionTypes.SET_EXPENSE:
        case ActionTypes.RESET_EXPENSE:
            return { ...state, expense: action?.payload }

        case ActionTypes.SET_ALERT:
            return { ...state, alertMessage: action.payload }

        case ActionTypes.RESET_ALERT:
            return { ...state, alertMessage: "" }

        default:
            return state
    }
}
