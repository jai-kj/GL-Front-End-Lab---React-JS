export interface ModalProps {
    showModal: boolean
    setShowModal: Function
}

export interface IExpenseModalProps extends ModalProps {
    fareId: number
}
