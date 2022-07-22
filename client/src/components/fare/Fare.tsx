import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUIDispatch, useUIState } from "../../context/context"
import BalanceList from "../balance/BalanceList"
import ExpenseList from "../expense/ExpenseList"

import Button from "../layout/Button"
import { IParticipant } from "./../../model/IParticipant"

const maxLimit = 20

const Fare = () => {
    const [isExpense, setIsExpense] = useState(true)

    const { fareId } = useParams()
    const {
        fare: {
            data: { title, date },
        },
        participants: { data: participantsData },
    } = useUIState()
    const { getFareFromFareList, fetchFareParticipants } = useUIDispatch()

    useEffect(() => {
        if (!fareId) return
        getFareFromFareList(parseInt(fareId))
        fetchFareParticipants(parseInt(fareId))
    }, [fareId, getFareFromFareList, fetchFareParticipants])

    return (
        <div className='mt-3 mb-12 h-full'>
            <div className='flex items-center border-b border-blue-500 w-full'>
                <Link to='/'>
                    <Button
                        className='h-8 text-xs sm:text-sm outline outline-1 bg:transparent text-white hover:bg-white hover:text-dark'
                        label='&#8592; Back'
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
            <div className='flex h-full pb-6'>
                <div className='w-3/4 h-full'>
                    {isExpense ? <ExpenseList /> : <BalanceList />}
                </div>
                <div className='w-1/4 flex flex-col h-full'>
                    <div className='p-4 text-white text-right h-full'>
                        <p className='text-2xl'>
                            {title}
                            <br />
                            <span className='text-stone-300 text-sm'>
                                {date}
                            </span>
                        </p>
                        <p className='text-rg mt-4'>
                            Total Participants: {participantsData?.length} /{" "}
                            {maxLimit}
                        </p>
                        {participantsData?.length ? (
                            <ul className="flex flex-col items-end space-y-2 mt-3 max-h-96 h-full overflow-y-auto">
                                {participantsData?.map(
                                    (participant: IParticipant) => (
                                        <li
                                            key={participant?.id}
                                            className={`p-3 h-8 text-lg w-fit flex items-center justify-center bg-violet-600 rounded-md font-semibold`}
                                        >{participant?.name}</li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='mt-auto'>
                        <Button
                            className='float-right text-light bg-red-600 hover:bg-red-500'
                            label='Add New Expense'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fare
