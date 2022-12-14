import { Link } from "react-router-dom"
import { IfareProps } from "./../../model/Ifare"

import { useUIDispatch, useUIState } from "../../context/context"
import useMiscellaneous from "../../hooks/useMiscellaneous"

const FateItem = ({ fare, callBack }: IfareProps) => {
    const { truncateString } = useMiscellaneous()
    const {
        participants: { loading },
    } = useUIState()
    const { fetchFareParticipants, setFare } = useUIDispatch()

    const handleEdit = () => {
        setFare(fare)
        fetchFareParticipants(fare?.id)
        callBack(true)
    }

    return (
        <tr className=''>
            <td className='p-4'>
                <Link to={`/fare/${fare?.id}`}>
                    <span className='hidden md:block'>
                        {truncateString(fare?.title, 75)}
                    </span>
                    <span className='md:hidden'>
                        {truncateString(fare?.title)}
                    </span>
                    <p className='text-xs text-stone-500 block md:hidden'>
                        {fare?.date}
                    </p>
                </Link>
            </td>
            <td className='hidden md:table-cell text-right p-4'>
                {fare?.date}
            </td>
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
