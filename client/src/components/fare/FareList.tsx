import { useEffect } from "react"
import { useUIDispatch, useUIState } from "../../context/context"
import { Ifare } from "./../../model/Ifare"

import AddFare from "./AddFare"
import FareItem from "./FateItem"

import useModal from "../../hooks/useModal"
import FareModal from "../layout/modal/FareModal"

const FareList = () => {
    const { show, setShow } = useModal()
    const { fetchFares, resetFare, resetFareParticipants } = useUIDispatch()
    const {
        fareList: { loading, error, data },
    } = useUIState()

    useEffect(() => {
        fetchFares()
        resetFare()
        resetFareParticipants()
    }, [fetchFares, resetFare, resetFareParticipants])

    return (
        <div className='flex flex-col h-full justify-between'>
            <FareModal
                showModal={show}
                setShowModal={(val: boolean) => {
                    setShow(val)
                    resetFareParticipants()
                }}
            />
            <table className='text-light table-auto w-full max-h-[calc(100%_-_4.5rem)]'>
                <thead className='text-xl sticky top-0 text-xl bg-dark'>
                    <tr>
                        <th className='w-7/12 text-left p-4'>Name</th>
                        <th className='hidden md:table-cell w-4/12 text-right p-4'>
                            Date
                        </th>
                        <th className='w-1/12' />
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
                                callBack={setShow}
                            />
                        ))}
                </tbody>
            </table>
            <AddFare
                callBack={(val: boolean) => {
                    resetFare()
                    setShow(val)
                }}
            />
        </div>
    )
}

export default FareList
