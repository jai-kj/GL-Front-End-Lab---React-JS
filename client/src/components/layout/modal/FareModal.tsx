import { useEffect, useState } from "react"
import { FareModalProps } from "../../../model/IModal"
import useInputRef from "../../../hooks/useInputRef"
import FormInput from "../FormInput"

const maxLimit = 20

const FareModal = ({
    showModal,
    setShowModal,
    modalTitle,
    fare,
}: FareModalProps) => {
    const {
        inputRef: titleInputRef,
        inputError: titleError,
        errorMsg: titleErrorMsg,
        handleInputBlur: handleTitleExit,
        onUpdate: titleInputUpdate,
    } = useInputRef({
        initialState: fare?.title,
        regex: /^[a-zA-Z][a-zA-Z0-9.,'" -]*$/,
        regexCheck: true,
        defaultErrorMsg:
            "Title cannot contain be empty or have special characters!",
    })

    const {
        inputRef: participantNameInputRef,
        inputError: participantError,
        errorMsg: participantErrorMsg,
        handleInputBlur: handleParticpantNameExit,
        onUpdate: participantInputUpdate,
        handleError: setParticipantError,
    } = useInputRef({
        regex: /^[a-zA-Z][a-zA-Z ]*$/,
        regexCheck: true,
        defaultErrorMsg:
            "Name must not be empty and contain only alphabets & spaces!",
    })

    const [participantList, setParticipantList] = useState<Array<string>>([])

    useEffect(() => { }, [])

    const handleParticipantRemove = (id: number) => {
        // 1. Remove sharer from server

        // 2. If step 1 is success then remove from localState
        const prevState = [...participantList]
        prevState.splice(id, 1)
        setParticipantList(prevState)
    }

    const handleParticipantAdd = () => {
        const participantName = participantNameInputRef?.current?.value

        if (participantError || !participantName)
            return console.log("Invalid Input")

        if (participantList?.length !== maxLimit) {
            setParticipantList((prevState: Array<string>) => [
                ...prevState,
                participantName,
            ])
            return participantInputUpdate()
        } else return setParticipantError(true, "Participant List Full!")
    }

    const handleFormReset = () => {
        if (fare) return
        // Reset all states
        titleInputUpdate()
        participantInputUpdate()
        setParticipantList([])
    }

    useEffect(() => {
        if (!fare) return handleFormReset()
        titleInputUpdate(fare?.title)
        setParticipantList(fare?.participantList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fare])

    return (
        <div
            className={`modal-container ${showModal ? "modal-container-show" : ""
                }`}
        >
            <div className={`modal ${showModal ? "modal-show" : ""}`}>
                <div className='modal-head'>
                    <h3 className='text-xl font-medium justify-self-center text-center pb-6 border-b-2 border-light'>
                        {modalTitle}
                        <span
                            className='float-right px-1 cursor-pointer text-red-300 font-bold text-2xl hover:scale-110'
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                    </h3>
                </div>
                <div className='modal-body my-2'>
                    <form>
                        <FormInput
                            id='fare-title'
                            label='* Title'
                            placeholder='Enter Title'
                            inputRef={titleInputRef}
                            inputExit={handleTitleExit}
                            inputError={titleError}
                            inputErrorMsg={titleErrorMsg}
                        />
                        <div className='flex space-x-2'>
                            <FormInput
                                id='participant-name'
                                label='* Participant Name'
                                placeholder='Enter Participant Name'
                                inputRef={participantNameInputRef}
                                inputExit={handleParticpantNameExit}
                                inputError={participantError}
                                inputErrorMsg={participantErrorMsg}
                            />
                            <div className='flex space-x-3 items-end mb-12 md:mb-8'>
                                <button
                                    type='button'
                                    className='bg-blue-500 rounded-md px-4 h-12 hover:bg-blue-400'
                                    onClick={handleParticipantAdd}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='flex flex-col'>
                        <div className='flex justify-between text-stone-300 text-xs'>
                            <label className='p-2'>Total Participants</label>
                            <label className='p-2'>
                                {participantList?.length} / {maxLimit}
                            </label>
                        </div>
                        <div className='flex flex-wrap w-full max-h-40 bg-dark rounded-lg p-3 gap-3 overflow-y-auto'>
                            {!participantList?.length ? (
                                <div className='px-2 h-8 flex justify-center items-center text-stone-400'>
                                    No Participants Added Yet!
                                </div>
                            ) : (
                                participantList?.map((participant, i) => (
                                    <div
                                        key={i}
                                        className='pl-2 pr-3 h-8 flex justify-center items-center bg-violet-600 rounded-md font-semibold'
                                    >
                                        <span
                                            className='mr-3 cursor-pointer hover:scale-125'
                                            onClick={() =>
                                                handleParticipantRemove(i)
                                            }
                                        >
                                            &times;
                                        </span>
                                        {participant}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='flex float-right mt-6 space-x-4'>
                        <button
                            type='button'
                            className={`bg-transparent w-24 h-12 border rounded-lg font-medium hover:text-dark hover:bg-light ${fare ? "cursor-not-allowed" : ""
                                }`}
                            onClick={handleFormReset}
                        >
                            Clear
                        </button>
                        <button
                            type='button'
                            className='w-24 h-12 rounded-lg font-medium bg-green-500 hover:bg-green-400'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FareModal
