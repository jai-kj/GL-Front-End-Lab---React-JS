export const ActionTypes = {
    GET_FARES: "GET_FARES",
    GET_FARE_PARTICPANTS: "GET_FARE_PARTICPANTS",
    SET_FARE: "SET_FARE",
    RESET_FARE: "RESET_FARE",
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.GET_FARES:
            return { ...state, fareList: action?.payload }

        case ActionTypes.GET_FARE_PARTICPANTS:
            return { ...state, participants: action?.payload }

        case ActionTypes.SET_FARE:
            return { ...state, fare: action?.payload }

        case ActionTypes.RESET_FARE:
            return {
                ...state,
                fare: {
                    id: null,
                    title: null,
                    date: null,
                },
            }

        default:
            return state
    }
}
