import { useUIDispatch, useUIState } from "../../context/context"
import useInputRef from "../../hooks/useInputRef"

import { IParticipant } from "./../../model/IParticipant"

import Button from "../layout/Button"
import FormInput from "../layout/FormInput"

const maxLimit = 20

const ParticipantList = () => {
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

    const {
        participants: { loading, data: participantsData },
        fare: {
            data: { id: fareId },
        },
    } = useUIState()
    const { addFareParticipant, removeFareParticipant } = useUIDispatch()

    const handleParticipantAdd = () => {
        if (loading || !fareId) return

        const name = participantNameInputRef?.current?.value

        if (participantError || !name) return console.log("Invalid Input")

        if (participantsData?.length === maxLimit)
            return setParticipantError(true, "Participant List Full!")

        const participantData: IParticipant = {
            id: 0,
            name,
            fareId,
        }

        participantInputUpdate()
        return addFareParticipant(participantData, fareId)
    }

    const handleParticipantRemove = (id: number | undefined) =>
        !loading && id && fareId && removeFareParticipant(id, fareId)

    if (!fareId) return <></>

    return (
        <div className='flex flex-col mt-6 sm:mt-0'>
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
                <div className='flex space-x-3 items-end mb-8'>
                    <Button
                        className='bg-blue-500 hover:bg-blue-400'
                        callBack={handleParticipantAdd}
                        disabled={loading}
                        label='Add'
                    />
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-between text-stone-400 text-xs'>
                    <label className='p-2'>Total Participants</label>
                    <label className='p-2'>
                        {participantsData?.length} / {maxLimit}
                    </label>
                </div>
                <div className='flex flex-wrap w-full max-h-40 bg-dark rounded-lg p-3 gap-3 overflow-y-auto'>
                    {loading || !participantsData?.length ? (
                        <div className='px-2 h-8 flex justify-center items-center text-stone-400'>
                            {loading
                                ? "Loading ..."
                                : `No Participants Added Yet!`}
                        </div>
                    ) : (
                        participantsData?.map((participant: IParticipant) => (
                            <div
                                key={participant?.id}
                                className={`pl-2 pr-3 h-8 flex justify-center items-center bg-violet-600 rounded-md font-semibold ${loading ? "cursor-not-allowed" : ""
                                    }`}
                            >
                                <span
                                    className='mr-3 cursor-pointer hover:scale-125'
                                    onClick={() =>
                                        handleParticipantRemove(participant?.id)
                                    }
                                >
                                    &times;
                                </span>
                                {participant?.name}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ParticipantList
