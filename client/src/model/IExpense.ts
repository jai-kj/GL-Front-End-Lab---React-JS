import { IParticipant } from "./IParticipant"

export interface IExpense {
    title: string | null
    amount: number | null
    fareId: number | null
    sharerId: number | null
    sharedBetween: number[]
    category: string | null
    date: string | null
    id?: number | null
}

export interface IExpenseListProps {
    fareId: number
    setShowModal: Function
}

export interface IExpenseItem {
    expense: IExpense
    loading: boolean
    callBack: Function
    participantsData: IParticipant[]
}

export interface IBalancedOut {
    paidBy: string
    receivedBy: string
    amount: number
}
