import { IfareProps } from "./../../model/Ifare"

import { useUIDispatch, useUIState } from "../../context/context"

const FateItem = ({ fare }: IfareProps) => {

    const { participants: { loading } } = useUIState()
    const { fetchFareParticipants, setFare } = useUIDispatch()

    const handleEdit = () => {
        setFare(fare)
        fetchFareParticipants(fare?.id)
    }

    return (
        <tr className=''>
            <td className='p-4'>{fare?.title}</td>
            <td className='text-right p-4'>{fare?.date}</td>
            <td className='text-right p-4'>
                <i
                    className={`fa-solid fa-pen-to-square cursor-pointer transition duration-75 hover:scale-125 hover:text-blue-400 ${loading ? "cursor-not-allowed" : ""
                        }`}
                    onClick={handleEdit}
                />
            </td>
        </tr>
    )
}

export default FateItem
