export interface ModalProps {
    modalTitle: string
    showModal: boolean
    setShowModal: Function
}

export interface FareModalProps extends ModalProps {
    fare?: any
}
