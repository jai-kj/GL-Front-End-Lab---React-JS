import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IParticipant } from "./../../model/IParticipant"

import { useUIDispatch, useUIState } from "../../context/context"
import useModal from "../../hooks/useModal"

import BalanceList from "../balance/BalanceList"
import ExpenseList from "../expense/ExpenseList"
import ExpenseAggregate from "./../expense/ExpenseAggregate"

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
        <div className='mt-3 expense-container'>
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
            <div className='flex flex-col md:flex-row expense-section'>
                <div className='w-full md:w-1/4 flex flex-col'>
                    <div className='py-4 text-white'>
                        <div className='relative'>
                            <p className='text-2xl font-medium'>{title}</p>
                            <Button
                                className='absolute block md:hidden right-0 top-0 w-20 text-light bg-red-600 hover:bg-red-500'
                                label='+ Add'
                                callBack={() => handleAddExpense()}
                            />
                        </div>

                        <span className='text-stone-300 text-sm'>{date}</span>

                        <p className='hidden md:block text-rg mt-5'>
                            Total Participants: {participantsData?.length} /{" "}
                            {maxLimit}
                        </p>
                        {participantsData?.length ? (
                            <ul className='hidden md:flex flex-wrap gap-3 mt-3 max-h-20 md:max-h-80 lg:max-h-96 overflow-y-auto'>
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
                        <Button
                            className='text-light bg-red-600 hover:bg-red-500'
                            label='Add Expense'
                            callBack={() => handleAddExpense()}
                        />
                    </div>
                </div>
                <div className='w-full md:w-3/4 flex flex-col'>
                    {isExpense ? (
                        <>
                            <div className='table-container px-2'>
                                <ExpenseList
                                    fareId={parseInt(fareId)}
                                    setShowModal={setShow}
                                />
                            </div>
                            <ExpenseAggregate />
                        </>
                    ) : (
                        <BalanceList />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Fare
