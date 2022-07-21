export const ActionTypes = {
    GET_FARES: "GET_FARES",
    SET_FARE: "SET_FARE",
    RESET_FARE: "RESET_FARE",
    ADD_FARE: "ADD_FARE",
    UPDATE_FARE: "UPDATE_FARE",
    REMOVE_FARE: "REMOVE_FARE",
    GET_FARE_PARTICPANTS: "GET_FARE_PARTICPANTS",
    RESET_FARE_PARTICPANTS: "RESET_FARE_PARTICPANTS",
    ADD_FARE_PARTICPANT: "ADD_FARE_PARTICPANT",
    REMOVE_FARE_PARTICPANT: "REMOVE_FARE_PARTICPANT",
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.GET_FARES:
            return { ...state, fareList: action?.payload }

        case ActionTypes.GET_FARE_PARTICPANTS:
        case ActionTypes.RESET_FARE_PARTICPANTS:
            return { ...state, participants: action?.payload }

        case ActionTypes.SET_FARE:
        case ActionTypes.ADD_FARE:
        case ActionTypes.UPDATE_FARE:
        case ActionTypes.REMOVE_FARE:
        case ActionTypes.RESET_FARE:
            return { ...state, fare: action?.payload }

        default:
            return state
    }
}
