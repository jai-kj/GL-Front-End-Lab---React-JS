import { useEffect } from "react"
import useInputRef from "../../../hooks/useInputRef"

import { ModalProps } from "../../../model/IModal"
import { Ifare } from "./../../../model/Ifare"

import { useUIDispatch, useUIState } from "../../../context/context"
import ParticipantList from "../../fare/ParticipantList"

import FormInput from "../FormInput"
import Button from "../Button"

const FareModal = ({ showModal, setShowModal }: ModalProps) => {
    const {
        inputRef: titleInputRef,
        inputError: titleError,
        errorMsg: titleErrorMsg,
        handleInputBlur: handleTitleExit,
        onUpdate: titleInputUpdate,
    } = useInputRef({
        regex: /^[a-zA-Z][a-zA-Z0-9.,'" -]*$/,
        regexCheck: true,
        defaultErrorMsg:
            "Title cannot contain be empty or have special characters!",
    })

    const {
        fare: {
            data: { id, title, date },
            loading,
        },
    } = useUIState()
    const { addFare, updateFare, deleteFare } = useUIDispatch()

    useEffect(() => {
        id ? titleInputUpdate(title ?? "") : handleFormReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleFormReset = () => titleInputUpdate()

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const titleName = titleInputRef?.current?.value
        if (titleError || !titleName) return console.log("Failed to Send")

        const fareData: Ifare = {
            id: !id ? null : id,
            title: titleName,
            date: !id ? new Date().toDateString() : date,
        }

        if (!id) return addFare(fareData)

        return updateFare(fareData, id)
    }

    const handleFareDelete = () => {
        if (!id || !window.confirm(`Do you want to delete the Fare: ${title}`))
            return
        setShowModal(false)
        deleteFare(id)
    }

    return (
        <div
            className={`modal-container ${showModal ? "modal-container-show" : ""
                }`}
        >
            <div className={`modal ${showModal ? "modal-show" : ""}`}>
                <div className='modal-head'>
                    <h3 className='text-xl font-medium justify-self-center text-center pb-6 border-b-2 border-light'>
                        {title ? "Edit Fare" : "New Fare"}
                        <span
                            className='float-right px-1 cursor-pointer text-red-400 font-bold text-2xl hover:scale-110'
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                    </h3>
                </div>
                <div className='modal-body my-2 flex flex-col'>
                    <form
                        className='flex flex-col items-end space-x-0 sm:space-x-3 sm:flex-row'
                        onSubmit={handleFormSubmit}
                    >
                        <FormInput
                            id='fare-title'
                            label='* Title'
                            placeholder='Enter Title'
                            inputRef={titleInputRef}
                            inputExit={handleTitleExit}
                            inputError={titleError}
                            inputErrorMsg={titleErrorMsg}
                        />
                        <Button
                            className='w-full sm:w-24 bg-green-500 mb-0 hover:bg-green-400 sm:mb-8'
                            type='submit'
                            label={loading ? "..." : id ? "Update" : "Create"}
                        />
                    </form>
                    <ParticipantList />
                    {id ? (
                        <div className='flex justify-end mt-6 space-x-3'>
                            <Button
                                className='w-24 h-12 bg-transparent text-red-400 outline outline-1 outline-red-400 hover:bg-red-400 hover:text-white'
                                label={"Delete"}
                                callBack={handleFareDelete}
                                disabled={loading}
                            />
                            <Button
                                className='w-24 bg:transparent outline outline-1 outline-white hover:bg-white hover:text-dark'
                                label='Save'
                                callBack={() => setShowModal(false)}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FareModal
