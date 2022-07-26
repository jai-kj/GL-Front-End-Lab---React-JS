import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IParticipant } from "./../../model/IParticipant"

import { useUIDispatch, useUIState } from "../../context/context"
import useModal from "../../hooks/useModal"

import BalanceList from "../balance/BalanceList"
import ExpenseList from "../expense/ExpenseList"

import Button from "../layout/Button"
import ExpenseModal from "../layout/modal/ExpenseModal"

const maxLimit = 20

const Fare = () => {
    const [isExpense, setIsExpense] = useState(true)

    const { fareId } = useParams()
    const { show, setShow } = useModal()

    const {
        fare: {
            data: { title, date },
        },
        participants: { data: participantsData },
    } = useUIState()
    const { getFare, fetchFareParticipants, resetExpense } = useUIDispatch()

    useEffect(() => {
        if (!fareId) return
        getFare(parseInt(fareId))
        fetchFareParticipants(parseInt(fareId))
        resetExpense()
    }, [fareId, getFare, fetchFareParticipants, resetExpense])

    const handleAddExpense = () => {
        if (!participantsData?.length) return
        resetExpense()
        setShow(true)
    }

    if (!fareId) return <></>

    return (
        <>
            <ExpenseModal
                showModal={show}
                setShowModal={setShow}
                fareId={parseInt(fareId)}
            />
            <div className='flex items-center border-b border-blue-500 w-full'>
                <Link to='/'>
                    <Button
                        className='text-xs sm:text-sm outline outline-1 bg:transparent text-white hover:bg-white hover:text-dark py-1 ml-0.5'
                        height='8'
                        label='&#8592; Home'
                    />
                </Link>
                <div
                    className={`cursor-pointer ml-auto font-medium flex items-center justify-center px-4 h-12 ${isExpense
                        ? "rounded-t-lg bg-blue-500 text-white"
                        : "text-blue-500"
                        }`}
                    onClick={() => setIsExpense(true)}
                >
                    Expenses
                </div>
                <div
                    className={`cursor-pointer flex font-medium items-center justify-center px-4 h-12 ${!isExpense
                        ? "rounded-t-lg bg-blue-500 text-white"
                        : "text-blue-500"
                        }`}
                    onClick={() => setIsExpense(false)}
                >
                    Balances
                </div>
            </div>
            <div className='flex flex-col md:flex-row expense-section h-[calc(100%_-_3.0625rem)]'>
                <div className='w-full md:w-1/4 flex flex-col'>
                    <div className='text-white'>
                        <div className='flex justify-between py-4 items-center'>
                            <div className='flex flex-col max-w-[calc(100%_-_5rem)] md:max-w-full'>
                                <p className='text-2xl font-medium truncate ...'>
                                    {title}
                                </p>
                                <span className='text-stone-300 text-xs'>
                                    {date}
                                </span>
                            </div>
                            {participantsData?.length ? (
                                <Button
                                    className='ml-2 block md:hidden w-20 text-light bg-red-600 hover:bg-red-500'
                                    label='Add'
                                    height='8'
                                    callBack={() => handleAddExpense()}
                                />
                            ) : (
                                <></>
                            )}
                        </div>

                        <p className='hidden md:block text-rg'>
                            Total Participants: {participantsData?.length} /{" "}
                            {maxLimit}
                        </p>
                        {participantsData?.length ? (
                            <ul className='hidden md:flex flex-wrap gap-3 my-3 max-h-20 md:max-h-80 lg:max-h-96 overflow-y-auto'>
                                {participantsData?.map(
                                    (participant: IParticipant) => (
                                        <li
                                            key={participant?.id}
                                            className={`p-3 h-8 text-lg w-fit flex items-center justify-center bg-violet-600 rounded-md font-semibold`}
                                        >
                                            {participant?.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='hidden md:block mt-auto'>
                        {participantsData?.length ? (
                            <Button
                                className='text-light bg-red-600 hover:bg-red-500'
                                label='Add Expense'
                                callBack={() => handleAddExpense()}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className='w-full md:w-3/4 flex flex-col justify-between h-[calc(100%_-_5.375rem)] md:h-full md:pl-2'>
                    {isExpense ? (
                        <ExpenseList
                            fareId={parseInt(fareId)}
                            setShowModal={setShow}
                        />
                    ) : (
                        <BalanceList />
                    )}
                </div>
            </div>
        </>
    )
}

export default Fare
