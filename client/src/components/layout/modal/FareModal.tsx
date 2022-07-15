import {ModalProps} from "../../../model/IModal"
import useInputRef from "../../../hooks/useInputRef"
import {useState} from "react"

const FareModal = ({showModal, setShowModal}: ModalProps) => {
    const {
        inputRef: titleInputRef,
        inputError: titleError,
        handleInputBlur: handleTitleExit,
    } = useInputRef({
        regex: /^[a-zA-Z][a-zA-Z0-9.,'" -]*$/,
        regexCheck: true,
    })

    const {
        inputRef: participantNameInputRef,
        inputError: participantError,
        handleInputBlur: handleParticpantNameExit,
    } = useInputRef({
        regex: /^[a-zA-Z][a-zA-Z ]*$/,
        regexCheck: true,
    })

    const [particantList, setParticipantList] = useState([])

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
                <div className='modal-body'>
                    <form>
                        <div className='form-control flex flex-col my-4'>
                            <label htmlFor='fare-title' className='p-2'>
                                * Title
                            </label>
                            <input
                                type='text'
                                id='fare-title'
                                placeholder='Enter Title'
                                className={`w-full h-12 bg-dark px-3 rounded-md border-2 outline-none ${titleError
                                    ? "border-red-400"
                                    : "border-transparent"
                                    }`}
                                ref={titleInputRef}
                                onBlur={handleTitleExit}
                            />
                        </div>
                        <div className='form-control flex flex-col my-4'>
                            <label htmlFor='participant-name' className='p-2'>
                                * Participant Name
                            </label>
                            <div className='flex space-x-3'>
                                <input
                                    type='text'
                                    id='participant-name'
                                    placeholder='Enter Participant Name'
                                    className={`w-full h-12 bg-dark px-3 rounded-md border-2 outline-none ${participantError
                                        ? "border-red-400"
                                        : "border-transparent"
                                        }`}
                                    ref={participantNameInputRef}
                                    onBlur={handleParticpantNameExit}
                                />
                                <button type="button" className="bg-blue-500 rounded-md px-4 hover:bg-blue-400">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FareModal
