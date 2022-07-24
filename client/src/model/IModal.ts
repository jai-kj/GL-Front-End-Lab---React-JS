import { IParticipant } from "./IParticipant"

export interface ModalProps {
    showModal: boolean
    setShowModal: Function
}

export interface IExpenseModalProps extends ModalProps {
    fareId: number
}

export interface IBalanceOutModal extends ModalProps {
    participantsBalance: number[]
    participantsData: IParticipant[]
    getParticipantsIndexes: {
        [key: number]: number
    }
}
