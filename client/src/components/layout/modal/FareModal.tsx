import { useState } from "react"
import { ModalProps } from "../../../model/IModal"
import useInputRef from "../../../hooks/useInputRef"

const maxLimit = 20

const FareModal = ({ showModal, setShowModal }: ModalProps) => {
    const {
        inputRef: titleInputRef,
        inputError: titleError,
        errorMsg: titleErrorMsg,
        handleInputBlur: handleTitleExit,
    } = useInputRef({
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

    const [particantList, setParticipantList] = useState<Array<string>>([])

    const handleParticipantRemove = (id: number) => {
        // 1. Remove sharer from server

        // 2. If step 1 is success then remove from localState
        const prevState = [...particantList]
        prevState.splice(id, 1)
        setParticipantList(prevState)
    }

    const handleParticipantAdd = () => {
        const participantName = participantNameInputRef?.current?.value

        if (participantError || !participantName)
            return console.log("Invalid Input")

        if (particantList?.length !== maxLimit) {
            setParticipantList((prevState: Array<string>) => [
                ...prevState,
                participantName,
            ])
            return participantInputUpdate()
        } else return setParticipantError(true, "Participant List Full!")
    }

    return (
        <div
            className={`modal-container ${showModal ? "modal-container-show" : ""
                }`}
        >
            <div className={`modal ${showModal ? "modal-show" : ""}`}>
                <div className='modal-head'>
                    <h3 className='text-xl font-medium justify-self-center text-center pb-6 border-b-2 border-light'>
                        Add Fare
                        <span
                            className='float-right px-1 cursor-pointer text-red-300 font-bold hover:scale-110'
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                    </h3>
                </div>
                <div className='modal-body my-2'>
                    <form>
                        <div className='form-control flex flex-col w-full'>
                            <label htmlFor='fare-title' className='p-2'>
                                * Title
                            </label>
                            <div className='flex flex-col'>
                                <input
                                    type='text'
                                    id='fare-title'
                                    placeholder='Enter Title'
                                    className={`w-full h-12 bg-dark px-3 rounded-md border-2 ${titleError
                                            ? "border-red-400 outline-none"
                                            : "border-transparent"
                                        }`}
                                    ref={titleInputRef}
                                    onBlur={handleTitleExit}
                                />
                                <p className='flex text-red-300 h-8 px-2 text-sm items-center'>
                                    {titleErrorMsg}
                                </p>
                            </div>
                        </div>
                        <div className='flex space-x-4'>
                            <div className='form-control flex flex-col w-full'>
                                <label
                                    htmlFor='participant-name'
                                    className='p-2'
                                >
                                    * Participant Name
                                </label>
                                <div className='flex flex-col'>
                                    <input
                                        type='text'
                                        id='participant-name'
                                        placeholder='Enter Participant Name'
                                        className={`w-full h-12 bg-dark px-3 rounded-md border-2 ${participantError
                                                ? "border-red-400 outline-none"
                                                : "border-transparent"
                                            }`}
                                        ref={participantNameInputRef}
                                        onBlur={handleParticpantNameExit}
                                    />
                                    <p className='flex text-red-300 h-8 px-2 text-sm items-center'>
                                        {participantErrorMsg}
                                    </p>
                                </div>
                            </div>
                            <div className='flex space-x-3 items-end mb-8'>
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
                                {particantList?.length} / {maxLimit}
                            </label>
                        </div>
                        <div className='flex flex-wrap w-full max-h-40 bg-dark rounded-lg p-3 gap-3 overflow-y-auto'>
                            {!particantList?.length ? (
                                <div className='px-2 h-8 flex justify-center items-center text-stone-400'>
                                    No Participants Added Yet!
                                </div>
                            ) : (
                                particantList?.map((participant, i) => (
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
                </div>
            </div>
        </div>
    )
}

export default FareModal
