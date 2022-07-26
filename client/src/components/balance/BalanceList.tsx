import { useCallback, useEffect, useMemo, useState } from "react"
import { useUIState } from "../../context/context"

import { IParticipant } from "./../../model/IParticipant"
import { IExpense } from "./../../model/IExpense"
import useModal from "../../hooks/useModal"
import Button from "../layout/Button"
import BalanceOutModal from "../layout/modal/BalanceOutModal"

const BalanceList = () => {
    const {
        participants: { data: participantsData },
        expenseList: { data: expenses },
    } = useUIState()

    const [participantsBalance, setParticipantsBalance] = useState(
        participantsData ? new Array(participantsData?.length).fill(0) : []
    )

    const { show, setShow } = useModal()

    const resetParticipantsBalance = useMemo(
        () =>
            participantsData?.length
                ? new Array(participantsData?.length).fill(0)
                : [],
        [participantsData?.length]
    )

    const getParticipantsIndexes = useMemo(() => {
        let mapper: {
            [key: number]: number
        } = {}
        if (participantsData?.length)
            participantsData?.forEach(
                (participant: IParticipant, index: number) => {
                    if (participant?.id)
                        mapper = { ...mapper, [participant?.id]: index }
                }
            )
        return mapper
    }, [participantsData])

    const calculateExpenses = useCallback(() => {
        if (!participantsData?.length) return

        const balances = [...resetParticipantsBalance]
        const participantToIndexMap = getParticipantsIndexes

        expenses?.forEach((expense: IExpense) => {
            const participantIndex = expense?.sharerId
                ? participantToIndexMap[expense?.sharerId]
                : -1

            balances[participantIndex] += expense?.amount
            const reduction =
                Math.round(
                    ((expense?.amount ?? 0) / expense?.sharedBetween?.length) *
                    100
                ) / 100

            let difference =
                Math.round(
                    ((expense?.amount ?? 0) -
                        reduction * expense?.sharedBetween?.length) *
                    100
                ) / 100

            let flag = false
            expense?.sharedBetween?.forEach((sharerId: number) => {
                if (sharerId === expense?.sharerId && !flag) flag = true
                const index = sharerId ? participantToIndexMap[sharerId] : -1
                balances[index] =
                    Math.round(
                        (balances[index] -
                            reduction -
                            (flag ? difference : 0)) *
                        100
                    ) / 100
                if (flag) difference = 0
            })
        })
        setParticipantsBalance(balances)
    }, [
        getParticipantsIndexes,
        expenses,
        participantsData,
        resetParticipantsBalance,
    ])

    useEffect(() => {
        if (!expenses?.length) return
        calculateExpenses()
    }, [expenses, calculateExpenses])

    const getExpenseOfSharer = useCallback(
        (sharerId: number) =>
            expenses
                ?.reduce(
                    (sum: number, expense: IExpense) =>
                        sum +
                        (expense?.sharerId === sharerId && expense?.amount
                            ? expense?.amount
                            : 0),
                    0
                )
                .toFixed(2),
        [expenses]
    )

    const getMaximumPayer = useMemo(
        () => Math.max(...participantsBalance),
        [participantsBalance]
    )

    const getWidth = useCallback(
        (size: number) =>
            Math.abs(
                Math.round(
                    ((size < 0 ? size * -1 : size) / getMaximumPayer) * 100
                ) - 20
            ),
        [getMaximumPayer]
    )

    const toShowModal = useMemo(
        () =>
            expenses?.length &&
            participantsData?.length &&
            participantsBalance?.length &&
            getParticipantsIndexes &&
            Object.keys(getParticipantsIndexes).length !== 0 &&
            getParticipantsIndexes.constructor === Object,

        [expenses, participantsData, participantsBalance, getParticipantsIndexes]
    )

    return (
        <>
            {toShowModal ? (
                <BalanceOutModal
                    showModal={show}
                    setShowModal={setShow}
                    participantsBalance={participantsBalance}
                    participantsData={participantsData}
                    getParticipantsIndexes={getParticipantsIndexes}
                />
            ) : (
                <></>
            )}
            <div className='max-h-[calc(100%_-_3rem)] overflow-y-auto'>
                <table className='balance-table text-light w-full'>
                    <thead className='sticky top-0 text-sm md:text-xl bg-dark'>
                        <tr>
                            <th className='w-2/12 text-left p-4'>Sharers</th>
                            <th className='w-8/12 text-center p-4' colSpan={2}>
                                Balance
                            </th>
                            <th className='hidden md:table-cell w-2/12 text-right p-4'>
                                Paid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!participantsData?.length || !expenses?.length ? (
                            <tr>
                                <td colSpan={4} className='p-4'>
                                    No Expenses Found!
                                </td>
                            </tr>
                        ) : (
                            participantsData?.map(
                                (participant: IParticipant, i: number) => (
                                    <tr key={i} className='font-medium'>
                                        <td className='w-2/12 p-4 text-sm md:text-lg'>
                                            {participant.name}
                                        </td>
                                        {participantsBalance[i] < 0 ? (
                                            <>
                                                <td className='w-4/12'>
                                                    <p className='flex space-x-3 items-center justify-end text-right'>
                                                        <span className='text-xs md:text-rg'>
                                                            {participantsBalance[
                                                                i
                                                            ]
                                                                ?.toFixed(2)
                                                                ?.replace(
                                                                    "-",
                                                                    "- ₹ "
                                                                )}
                                                        </span>
                                                        <span
                                                            className={`p-4 bg-red-500`}
                                                            style={{
                                                                width: `${getWidth(
                                                                    participantsBalance[
                                                                    i
                                                                    ]
                                                                )}%`,
                                                            }}
                                                        ></span>
                                                    </p>
                                                </td>
                                                <td />
                                            </>
                                        ) : (
                                            <>
                                                <td />
                                                <td className='w-4/12'>
                                                    <p className='flex space-x-3 items-center justify-start text-left'>
                                                        <span
                                                            className={`p-4 bg-green-500`}
                                                            style={{
                                                                width: `${getWidth(
                                                                    participantsBalance[
                                                                    i
                                                                    ]
                                                                )}%`,
                                                            }}
                                                        ></span>
                                                        <span className='text-sm md:text-lg'>
                                                            {`+ ₹ ${participantsBalance[
                                                                i
                                                            ]?.toFixed(2)}`}
                                                        </span>
                                                    </p>
                                                </td>
                                            </>
                                        )}
                                        <td className='hidden md:table-cell p-4 text-right'>
                                            ₹{" "}
                                            {getExpenseOfSharer(
                                                participant?.id
                                            )}
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {toShowModal ? (
                <div className='h-12 px-2 flex justify-between items-center border-t-2 border-white'>
                    <span className='text-light font-semibold px-2 text-sm md:text-xl'>
                        Per Person Cost : ₹{" "}
                        {(
                            Math.round(
                                (getExpenseOfSharer(participantsData[0]?.id) -
                                    participantsBalance[0]) *
                                10
                            ) / 10
                        ).toFixed(2)}
                    </span>
                    <Button
                        label='Balance Out'
                        className='text-light bg-transparent text-xs md:text-rg outline outline-1 text-white hover:bg-white hover:text-dark'
                        height='8'
                        callBack={() => setShow(true)}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default BalanceList
