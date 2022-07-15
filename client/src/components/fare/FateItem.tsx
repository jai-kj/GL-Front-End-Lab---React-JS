import useFetch from "../../hooks/useFetch"
import { IfareProps } from "./../../model/Ifare"

const FateItem = ({ fare, handleEdit }: IfareProps) => {
    const { loading, data, error } = useFetch(
        {
            method: "GET",
            url: "/sharers?fareId=1",
        },
        true
    )

    const onEdit = () => {
        if (loading || error || !data) return
        handleEdit({
            title: fare?.title,
            participantList: data?.map((participant: any) => participant?.name),
        })
    }

    return (
        <tr>
            <td className='p-4'>{fare?.title}</td>
            <td className='text-right p-4'>{fare?.date}</td>
            <td className='text-right p-4'>
                <i
                    className={`fa-solid fa-pen-to-square cursor-pointer transition duration-75 hover:scale-125 hover:text-blue-400 ${loading ? "cursor-not-allowed" : ""
                        }`}
                    onClick={() => onEdit()}
                />
            </td>
        </tr>
    )
}

export default FateItem
