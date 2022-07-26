import { useMemo } from "react"
import { useUIState } from "../../context/context"
import { IExpense } from "../../model/IExpense"

const ExpenseAggregate = () => {
    const {
        expenseList: { data: expenses },
    } = useUIState()

    const getExpensesTotal = useMemo(
        () =>
            expenses?.reduce(
                (sum: number, expense: IExpense) =>
                    sum + (expense?.amount ?? 0),
                0
            ).toFixed(2),
        [expenses]
    )

    return expenses?.length ? (
        <div className='border-t-2 border-white text-white font-medium flex text-sm md:text-xl flex h-12 items-center'>
            <div className='w-6/12 sm:w-8/12 px-4'>
                Total Expenses : {expenses?.length}
            </div>
            <div className='w-4/12 sm:w-3/12 px-3 md:px-5 text-right'>₹ {getExpensesTotal}</div>
            <div className='w-2/12 sm:w-1/12'></div>
        </div>
    ) : (
        <></>
    )
}

export default ExpenseAggregate
