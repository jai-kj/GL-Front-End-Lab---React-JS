import { useCallback, useEffect } from "react"
import useInputRef from "../../../hooks/useInputRef"
import useMiscellaneous from "../../../hooks/useMiscellaneous"

import { ModalProps } from "../../../model/IModal"
import { Ifare } from "./../../../model/Ifare"

import { useUIDispatch, useUIState } from "../../../context/context"
import ParticipantList from "../../fare/ParticipantList"

import FormInput from "../FormInput"
import Button from "../Button"
import Loader from "../loader/Loader"

const today = new Date().toISOString().split("T")[0]

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
        inputRef: dateInputRef,
        inputError: dateInputError,
        errorMsg: dateInputErrorMsg,
        handleInputBlur: handleDateInputExit,
        onUpdate: dateInputUpdate,
    } = useInputRef({
        regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        regexCheck: true,
        defaultErrorMsg: "Please enter a valid past Date!",
    })

    const { formatDateToString } = useMiscellaneous()

    const {
        fare: {
            data: { id, title },
            data: fareData,
            loading,
        },
    } = useUIState()
    const { addFare, updateFare, deleteFare, setAlert } = useUIDispatch()

    const handleFormReset = useCallback(() => {
        titleInputUpdate()
        dateInputUpdate()
    }, [titleInputUpdate, dateInputUpdate])

    useEffect(() => {
        if (!fareData?.id) handleFormReset()

        titleInputUpdate(fareData?.title ?? "")
        formatDateToString(fareData?.date, dateInputUpdate)
    }, [
        fareData,
        titleInputUpdate,
        formatDateToString,
        dateInputUpdate,
        handleFormReset,
    ])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const titleName = titleInputRef?.current?.value?.trim()
        const date = dateInputRef?.current?.value
        if (titleError || !titleName || dateInputError || !date || date > today)
            return setAlert("Valid Fare Name and Date are * Required!")

        const fareData: Ifare = {
            id: !id ? null : id,
            title: titleName,
            date: new Date(date)?.toDateString(),
        }

        if (!id) await addFare(fareData)
        else await updateFare(fareData, id)
    }

    const handleFareDelete = async () => {
        if (!id || !window.confirm(`Do you want to delete the Fare: ${title}`))
            return
        await deleteFare(id)
        setShowModal(false)
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
                    <form className='flex flex-col' onSubmit={handleFormSubmit}>
                        <FormInput
                            id='fare-title'
                            label='* Title'
                            placeholder='Enter Title'
                            inputRef={titleInputRef}
                            inputExit={handleTitleExit}
                            inputError={titleError}
                            inputErrorMsg={titleErrorMsg}
                        />
                        <div className='flex flex-col items-end space-x-0 sm:space-x-3 sm:flex-row'>
                            <FormInput
                                id='fare-date'
                                label='* Date'
                                type='date'
                                max={today}
                                placeholder='Enter Date'
                                inputRef={dateInputRef}
                                inputExit={handleDateInputExit}
                                inputError={dateInputError}
                                inputErrorMsg={dateInputErrorMsg}
                            />
                            <Button
                                className='w-full sm:w-24 bg-green-500 mb-0 hover:bg-green-400 sm:mb-8'
                                type='submit'
                                label={
                                    loading ? (
                                        <Loader />
                                    ) : id ? (
                                        "Update"
                                    ) : (
                                        "Create"
                                    )
                                }
                            />
                        </div>
                    </form>
                    <ParticipantList />
                    {id ? (
                        <div className='flex justify-end mt-6 space-x-3'>
                            <Button
                                className='w-24 h-12 bg-transparent text-red-400 outline outline-1 outline-red-400 hover:bg-red-400 hover:text-white'
                                label={loading ? <Loader /> : "Delete"}
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
