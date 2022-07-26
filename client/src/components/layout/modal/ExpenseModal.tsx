import { useCallback, useEffect, useMemo, useState } from "react"
import { IExpenseModalProps } from "../../../model/IModal"
import { IParticipant } from "../../../model/IParticipant"
import { IExpense } from "../../../model/IExpense"

import { useUIDispatch, useUIState } from "../../../context/context"
import useInputRef from "../../../hooks/useInputRef"

import Dropdown from "../Dropdown"
import FormInput from "../FormInput"
import Button from "../Button"
import ExpenseSplitBetween from "../../expense/ExpenseSplitBetween"

const categoryList = [
    { option: "Accomodation", value: "Accomodation" },
    { option: "Beauty & Care", value: "Beauty & Care" },
    { option: "Education", value: "Education" },
    { option: "Electronics", value: "Electronics" },
    { option: "EMI", value: "EMI" },
    { option: "Entertainment", value: "Entertainment" },
    { option: "Food & Drinks", value: "Food & Drinks" },
    { option: "Fuel", value: "Fuel" },
    { option: "Gifts", value: "Gifts" },
    { option: "Groceries", value: "Groceries" },
    { option: "Healthcare", value: "Healthcare" },
    { option: "Insurance", value: "Insurance" },
    { option: "Investment", value: "Investment" },
    { option: "Reimbersement", value: "Reimbersement" },
    { option: "Rent & Charges", value: "Rent & Charges" },
    { option: "Shopping", value: "Shopping" },
    { option: "Transport", value: "Transport" },
    { option: "Utensils", value: "Utensils" },
    { option: "Others", value: "Others" },
]

const defaultOption = {
    option: "",
    value: "",
}

const today = new Date().toISOString().split("T")[0]

const ExpenseModal = ({
    showModal,
    setShowModal,
    fareId,
}: IExpenseModalProps) => {
    const {
        inputRef: expenseTitleInputRef,
        inputError: expenseTitleError,
        errorMsg: expenseTitleErrorMsg,
        handleInputBlur: handleExpenseTitleExit,
        onUpdate: expenseTitleInputUpdate,
    } = useInputRef({
        regex: /^[a-zA-Z][a-zA-Z0-9.,'" -]*$/,
        regexCheck: true,
        defaultErrorMsg:
            "Expense Title cannot contain be empty or have special characters!",
    })

    const {
        inputRef: expenseAmountInputRef,
        inputError: expenseAmountError,
        errorMsg: expenseAmountErrorMsg,
        handleInputBlur: handleExpenseAmountExit,
        onUpdate: expenseAmountInputUpdate,
    } = useInputRef({
        regex: /^(?=.*[1-9])\d*\.?\d*$/gm,
        regexCheck: true,
        defaultErrorMsg:
            "Expense Amount should only be positive currency values upto 2 decimal places only!",
    })

    const {
        inputRef: dateInputRef,
        inputError: dateInputError,
        errorMsg: dateInputErrorMsg,
        handleInputBlur: handleDateInputExit,
        onUpdate: dateInputUpdate,
    } = useInputRef({
        regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        regexCheck: true,
        defaultErrorMsg: "Please enter a valid past Date!",
    })

    const {
        participants: { data: participantsData },
        expense: { data: expenseData, loading: expenseLoading },
    } = useUIState()
    const { addExpense, updateExpense, deleteExpense } = useUIDispatch()

    const [paidBy, setPaidBy] = useState({ ...defaultOption })
    const [category, setCategory] = useState({ ...defaultOption })
    const [splitBetweenList, setSplitBetweenList] = useState(
        participantsData ? new Array(participantsData?.length).fill(true) : []
    )

    const resetSplitBetweenList = useCallback(() => {
        participantsData?.length &&
            setSplitBetweenList(new Array(participantsData?.length).fill(true))
    }, [participantsData?.length])

    const getParticipantOption = useCallback(
        (id: number | null) => {
            const participant = participantsData?.find(
                (par: IParticipant) => par.id === id
            )
            return {
                value: id ? `${id}` : "",
                option: participant?.name ?? "Select",
            }
        },
        [participantsData]
    )

    const updateShareBetween = useMemo(
        () =>
            participantsData?.length && expenseData?.sharedBetween?.length
                ? participantsData?.map((participant: IParticipant) =>
                    expenseData?.sharedBetween?.includes(participant?.id)
                )
                : [],

        [expenseData, participantsData]
    )

    const formatDateToString = useCallback(
        (dateStr: string) => {
            if (!dateStr) return

            const dateObj = new Date(dateStr)
            dateInputUpdate(
                `${dateObj.getFullYear()}-${dateObj.getMonth() < 10 ? "0" : ""
                }${dateObj.getMonth()}-${dateObj.getDate()}`
            )
        },
        [dateInputUpdate]
    )

    const updateStates = useCallback(() => {
        expenseTitleInputUpdate(expenseData?.title)
        expenseAmountInputUpdate(expenseData?.amount)
        formatDateToString(expenseData?.date ?? "")
        setPaidBy(getParticipantOption(expenseData?.sharerId))
        setCategory({
            option: expenseData?.category,
            value: expenseData?.category,
        })
        setSplitBetweenList(updateShareBetween)
    }, [
        expenseData,
        expenseTitleInputUpdate,
        expenseAmountInputUpdate,
        formatDateToString,
        getParticipantOption,
        updateShareBetween,
    ])

    const handleFormReset = useCallback(() => {
        expenseTitleInputUpdate()
        expenseAmountInputUpdate()
        dateInputUpdate()
        setPaidBy({ ...defaultOption })
        setCategory({ ...defaultOption })
        resetSplitBetweenList()
    }, [
        expenseTitleInputUpdate,
        expenseAmountInputUpdate,
        dateInputUpdate,
        resetSplitBetweenList,
    ])

    useEffect(() => {
        handleFormReset()
        if (!expenseData?.id) return
        updateStates()
    }, [participantsData, handleFormReset, expenseData, updateStates])

    const formatToDropdownOptions = useMemo(
        () =>
            participantsData?.length
                ? participantsData?.map((participant: IParticipant) => ({
                    option: participant?.name,
                    value: participant?.id,
                }))
                : [],
        [participantsData]
    )

    const allAreFalse = useMemo(
        () => splitBetweenList?.every((element: boolean) => element === false),
        [splitBetweenList]
    )

    const handleSplitBetweenCheck = (index: number) => {
        const updatedSplitList = splitBetweenList?.map(
            (item: boolean, i: number) => (index === i ? !item : item)
        )
        setSplitBetweenList(updatedSplitList)
    }

    const handleExpenseDelete = () => {
        if (
            expenseLoading ||
            !expenseData?.id ||
            !window.confirm(
                `Do you want to delete the Expense: ${expenseData?.title}`
            )
        )
            return
        setShowModal(false)
        deleteExpense(fareId, expenseData?.id)
    }

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        // Gather data
        const title = expenseTitleInputRef?.current?.value?.trim(),
            amount = expenseAmountInputRef?.current?.value?.trim(),
            date = dateInputRef?.current?.value,
            expensePayer = paidBy?.value,
            expenseCategory = category?.value,
            isSplit = splitBetweenList.length && !allAreFalse

        if (
            !fareId ||
            !title ||
            expenseTitleError ||
            !amount ||
            expenseAmountError ||
            !date ||
            date > today ||
            !expensePayer ||
            !expenseCategory ||
            !isSplit
        )
            return console.log(
                `Expense Title, Amount, Date, Paid By, Category and atleast one Person to Split Expense Between are * Required fields!`
            )

        // Make array of sharers to split bill
        const billSplitBetween: number[] = []
        splitBetweenList?.forEach(
            (item: boolean, i: number) =>
                item && billSplitBetween.push(participantsData[i]?.id)
        )

        const expense: IExpense = {
            title,
            amount: parseFloat(amount),
            fareId,
            sharerId: parseInt(expensePayer),
            sharedBetween: billSplitBetween,
            category: expenseCategory,
            date: new Date(date)?.toDateString(),
        }

        if (expenseData?.id) updateExpense(fareId, expenseData?.id, expense)
        else addExpense(fareId, expense)

        setShowModal(false)
        handleFormReset()
    }

    return (
        <div
            className={`modal-container ${showModal ? "modal-container-show" : ""
                }`}
        >
            <div
                className={`modal ${showModal ? "modal-show" : ""
                    } overflow-y-auto sm:overflow-y-none`}
            >
                <div className='modal-head'>
                    <h3 className='text-xl font-medium justify-self-center text-center pb-6 border-b-2 border-light'>
                        {expenseData?.id ? "Update Expense" : "New Expense"}
                        <span
                            className='float-right px-1 cursor-pointer text-red-400 font-bold text-2xl hover:scale-110'
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                    </h3>
                </div>
                <div className='modal-body my-2 flex flex-col'>
                    <form
                        className='flex flex-col items-end'
                        onSubmit={handleFormSubmit}
                    >
                        <FormInput
                            id='expense-title'
                            label='* Expense Title'
                            placeholder='Enter Expense Title'
                            inputRef={expenseTitleInputRef}
                            inputExit={handleExpenseTitleExit}
                            inputError={expenseTitleError}
                            inputErrorMsg={expenseTitleErrorMsg}
                        />
                        <div className='flex flex-col w-full sm:flex-row space-x-0 sm:space-x-3 space-y-4 sm:space-y-0'>
                            <FormInput
                                id='expense-date'
                                label='* Date'
                                type='date'
                                max={today}
                                placeholder='Enter Date'
                                inputRef={dateInputRef}
                                inputExit={handleDateInputExit}
                                inputError={dateInputError}
                                inputErrorMsg={dateInputErrorMsg}
                            />
                            <FormInput
                                id='expense-amount'
                                type='number'
                                label='* Expense Amount'
                                placeholder='Enter Expense Amount'
                                inputRef={expenseAmountInputRef}
                                inputExit={handleExpenseAmountExit}
                                inputError={expenseAmountError}
                                inputErrorMsg={expenseAmountErrorMsg}
                            />
                        </div>
                        <div className='flex flex-col w-full sm:flex-row space-x-0 sm:space-x-3 space-y-4 sm:space-y-0'>
                            <Dropdown
                                id='expense-payer'
                                label='* Paid By'
                                selected={paidBy}
                                setSelected={setPaidBy}
                                list={formatToDropdownOptions}
                            />
                            <Dropdown
                                id='expense-category'
                                label='* Category'
                                selected={category}
                                setSelected={setCategory}
                                list={categoryList}
                            />
                        </div>
                        {splitBetweenList?.length ? (
                            <ExpenseSplitBetween
                                list={formatToDropdownOptions}
                                id='expense-split-between'
                                label='* Split Between'
                                checkedList={splitBetweenList}
                                setCheckList={handleSplitBetweenCheck}
                            />
                        ) : (
                            <></>
                        )}
                        <div className='flex justify-end mt-6 space-x-3'>
                            {expenseData?.id ? (
                                <Button
                                    className={`w-24 h-12 bg-transparent text-red-400 outline outline-1 outline-red-400 hover:bg-red-400 hover:text-white ${expenseLoading
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                        }`}
                                    label='Delete'
                                    callBack={handleExpenseDelete}
                                />
                            ) : (
                                <Button
                                    className='w-24 h-12 bg-transparent text-white outline outline-1 hover:bg-white hover:text-dark'
                                    label='Clear'
                                    callBack={handleFormReset}
                                />
                            )}
                            <Button
                                className='w-24 bg-green-500 hover:bg-green-400'
                                label={expenseData?.id ? "Update" : "Save"}
                                type='submit'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExpenseModal
