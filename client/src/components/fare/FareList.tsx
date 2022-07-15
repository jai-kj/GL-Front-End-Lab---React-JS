import { useCallback, useEffect, useState } from "react"
import { Ifare } from "./../../model/Ifare"

import FareItem from "./FateItem"
import AddFare from "./AddFare"
import FareModal from "../layout/modal/FareModal"

import useFetch from "../../hooks/useFetch"
import useModal from "../../hooks/useModal"

const FareList = () => {
    const { loading, data, error, sendRequest } = useFetch({
        method: "GET",
        url: "/fares?_sort=id&_order=desc",
    })

    const [fare, setFare] = useState({
        title: "",
        participantList: [],
    })

    const { show, setShow } = useModal()

    const handleEdit = useCallback(
        (data: any) => {
            setShow(true)
            setFare(data)
        },
        [setShow]
    )

    useEffect(() => {
        sendRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <FareModal
                modalTitle='Edit Fare'
                showModal={show}
                setShowModal={setShow}
                fare={fare}
                callBack={sendRequest}
            />
            <table className='my-12 text-light table-auto w-full max-h-96'>
                <thead className='text-xl border-b-2 border-light'>
                    <tr>
                        <th className='w-7/12 text-left p-4'>Name</th>
                        <th className='w-3/12 text-right p-4'>Date</th>
                        <th className='w-2/12' />
                    </tr>
                </thead>
                <tbody>
                    {(loading || error || !data?.length) && (
                        <tr>
                            <td colSpan={3} className='p-4'>
                                {loading
                                    ? "Loading ..."
                                    : error
                                        ? error
                                        : !data?.length
                                            ? "No Fares Found!"
                                            : ""}
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        data &&
                        data?.map((row: Ifare) => (
                            <FareItem
                                fare={row}
                                key={row?.id}
                                handleEdit={handleEdit}
                            />
                        ))}
                </tbody>
            </table>
            <AddFare callBack={sendRequest} />
        </>
    )
}

export default FareList
