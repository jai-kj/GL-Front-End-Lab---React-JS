export interface Ifare {
    title: string | null
    date: string | null
    id: number
}

export interface IfareProps {
    fare: Ifare
    callBack: Function
}

export interface IAddFare {
    callBack: Function
}
