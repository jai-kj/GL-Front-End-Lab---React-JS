import { useEffect } from "react"
import { useUIDispatch, useUIState } from "../../context/context"
import { Ifare } from "./../../model/Ifare"

import AddFare from "./AddFare"
import FareItem from "./FateItem"

import useModal from "../../hooks/useModal"
import FareModal from "../layout/modal/FareModal"

const FareList = () => {
    const { show, setShow } = useModal()
    const { fetchFares, resetFare } = useUIDispatch()
    const { fareList: { loading, error, data } } = useUIState()


    useEffect(() => {
        fetchFares()
    }, [fetchFares])

    return (
        <>
            <FareModal showModal={show} setShowModal={setShow} />
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
                            />
                        ))}
                </tbody>
            </table>
            <AddFare callBack={(val: boolean) => {
                resetFare()
                setShow(val)
            }} />
        </>
    )
}

export default FareList
