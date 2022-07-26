import { useCallback } from "react"
import { useUIDispatch } from "../../context/context"

import { IParticipant } from "../../model/IParticipant"
import { IExpenseItem } from "./../../model/IExpense"

import useMiscellaneous from "./../../hooks/useMiscellaneous"

const ExpenseItem = ({
    expense,
    callBack,
    loading,
    participantsData,
}: IExpenseItem) => {
    const { truncateString } = useMiscellaneous()
    const { setExpense } = useUIDispatch()

    const handleEdit = () => {
        setExpense(expense)
        callBack(true)
    }

    const getParticipantName = useCallback(
        (sharerId: number | null) => {
            const participant = participantsData?.find(
                (par: IParticipant) => par.id === sharerId
            )
            return participant?.name ?? ""
        },
        [participantsData]
    )

    const getBillSharers = useCallback(
        (sharers: number[]) =>
            participantsData
                ?.map((participant: IParticipant) =>
                    sharers?.includes(participant?.id) ? participant?.name : ""
                )
                ?.join(","),
        [participantsData]
    )

    return (
        <tr>
            <td className='p-4'>
                <p className='md:hidden text-sm md:text-lg'>
                    {truncateString(expense?.title)}
                </p>
                <p className='hidden md:block text-sm md:text-lg'>
                    {expense?.title}
                </p>
                <span className='hidden sm:block text-stone-500'>
                    Shared Between:{" "}
                </span>
                <span className='hidden sm:block text-stone-200'>
                    {getBillSharers(expense?.sharedBetween)}
                </span>
                <p className='text-xs md:text-sm block sm:hidden'>
                    <span className='text-stone-500'>Paid By: </span>
                    <span className='text-stone-200'>
                        {getParticipantName(expense?.sharerId)}
                    </span>
                </p>
            </td>
            <td className='hidden sm:table-cell p-4'>
                <p className='text-sm md:text-lg'>{expense?.category}</p>
                <span className='text-stone-500'>Paid By: </span>
                <span className='text-stone-200'>
                    {getParticipantName(expense?.sharerId)}
                </span>
            </td>
            <td className='p-4 text-right'>
                <p className='text-sm md:text-lg'>
                    ₹ {expense?.amount?.toFixed(2)}
                </p>
                <span className='text-xxs sm:text-rg text-stone-200'>
                    {expense?.date}
                </span>
            </td>
            <td className='p-4 text-right'>
                <i
                    className={`fa-solid fa-pen-to-square cursor-pointer transition duration-75 hover:scale-125 hover:text-blue-400 ${loading ? "cursor-not-allowed" : ""
                        }`}
                    onClick={handleEdit}
                />
            </td>
        </tr>
    )
}

export default ExpenseItem
