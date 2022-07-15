export interface Ifare {
    title: string
    date: string
    id: number
}

export interface IfareProps {
    fare: Ifare
    handleEdit: Function
}

export interface IAddFare {
    callBack: Function
}
