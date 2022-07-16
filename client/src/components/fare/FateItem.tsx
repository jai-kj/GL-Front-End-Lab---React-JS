import { IfareProps } from "./../../model/Ifare"

import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

const FateItem = ({ fare, handleEdit }: IfareProps) => {
    const { loading, data, error, sendRequest } = useFetch({
        method: "GET",
        url: "/sharers",
        params: {
            fareId: fare?.id,
        },
    })

    useEffect(() => {
        sendRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onEdit = async () => {
        if (loading || error || !data) return
        handleEdit({
            ...fare,
            participantList: data?.map((participant: any) => participant?.name),
        })
    }

    return (
        <tr className='odd:bg-zinc-700'>
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
