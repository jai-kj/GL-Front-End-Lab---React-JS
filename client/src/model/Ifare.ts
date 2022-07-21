export interface Ifare {
    title: string
    date: string
    id: number
}

export interface IfareProps {
    fare: Ifare
}

export interface IAddFare {
    callBack: Function
}

export interface IFareForm {
    fare: Ifare
    callBack: Function
}