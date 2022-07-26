import { useEffect } from "react"
import { IExpense, IExpenseListProps } from "../../model/IExpense"
import { useUIDispatch, useUIState } from "../../context/context"

import ExpenseItem from "./ExpenseItem"
import ExpenseAggregate from "./ExpenseAggregate"

const ExpenseList = ({ fareId, setShowModal }: IExpenseListProps) => {
    const {
        expenseList: { loading, data: expenses, error },
        participants: { data: participantsData },
    } = useUIState()
    const { fetchExpenses } = useUIDispatch()

    useEffect(() => {
        fetchExpenses(fareId)
    }, [fetchExpenses, fareId])

    return (
        <>
            <div className='max-h-[calc(100%_-_3rem)] overflow-y-auto'>
                <table className='expense-table text-light w-full'>
                    <thead className='sticky top-0 text-sm md:text-xl bg-dark'>
                        <tr>
                            <th className='w-7/12 text-left p-4'>Expense</th>
                            <th className='hidden sm:table-cell w-2/12 text-left p-4'>Category</th>
                            <th className='w-4/12 sm:w-2/12 text-right p-4'>
                                Amount
                            </th>
                            <th className='w-1/12' />
                        </tr>
                    </thead>
                    <tbody>
                        {(loading || error || !expenses?.length) && (
                            <tr>
                                <td colSpan={4} className='p-4'>
                                    {loading
                                        ? "Loading ..."
                                        : error
                                            ? error
                                            : !expenses?.length
                                                ? "No Expenses Found!"
                                                : ""}
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            expenses &&
                            expenses?.map((row: IExpense) => (
                                <ExpenseItem
                                    key={row?.id}
                                    expense={row}
                                    loading={loading}
                                    callBack={setShowModal}
                                    participantsData={participantsData}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
            <ExpenseAggregate />
        </>
    )
}

export default ExpenseList
