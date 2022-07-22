import { useCallback, useEffect, useMemo, useState } from "react"
import { ModalProps } from "../../../model/IModal"
import { IParticipant } from "../../../model/IParticipant"

import { useUIState } from "../../../context/context"
import useInputRef from "../../../hooks/useInputRef"

import Dropdown from "../Dropdown"
import FormInput from "../FormInput"
import ExpenseSplitBetween from "../../expense/ExpenseSplitBetween"
import Button from "../Button"

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
    { option: "Rent & Charges", value: "Rent & Charges" },
    { option: "Shopping", value: "Shopping" },
    { option: "Transport", value: "Transport" },
    { option: "Others", value: "Others" },
]

const defaultOption = {
    option: "",
    value: "",
}

const ExpenseModal = ({ showModal, setShowModal }: ModalProps) => {
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
        regex: /^[1-9]\d*(?:[.]\d{1,2}[^.])?$/,
        regexCheck: true,
        defaultErrorMsg:
            "Expense Amount should only be positive currency values upto 2 decimal places only!",
    })

    const [payer, setPayer] = useState({ ...defaultOption })
    const [category, setCategory] = useState({ ...defaultOption })
    const {
        participants: { data: participantsData },
    } = useUIState()
    const [splitBetweenList, setSplitBetweenList] = useState(
        participantsData ? new Array(participantsData?.length).fill(true) : []
    )

    const resetSplitBetweenList = useCallback(() => {
        participantsData?.length &&
            setSplitBetweenList(new Array(participantsData?.length).fill(true))
    }, [participantsData?.length])

    useEffect(() => {
        resetSplitBetweenList()
    }, [participantsData, resetSplitBetweenList])

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

    const handleFormReset = () => {
        expenseTitleInputUpdate()
        expenseAmountInputUpdate()
        setPayer({ ...defaultOption })
        setCategory({ ...defaultOption })
        resetSplitBetweenList()
    }

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        // Gather data
        const title = expenseTitleInputRef?.current?.value,
            amount = expenseAmountInputRef?.current?.value,
            expensePayer = payer?.value,
            expenseCategory = category?.value,
            isSplit = splitBetweenList.length && !allAreFalse

        if (!title || !amount || !expensePayer || !expenseCategory || !isSplit)
            return console.log(
                `Expense Title, Amount, Paid By, Category and atleast one Person to Split Expense Between are * Required fields!`
            )
        // handleFormReset()
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
                        {"New Expense"}
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
                        <div className='flex flex-col w-full sm:flex-row space-x-0 sm:space-x-3 space-y-4 sm:space-y-0'>
                            <Dropdown
                                id='expense-payer'
                                label='* Paid By'
                                selected={payer}
                                setSelected={setPayer}
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
                            <Button
                                className='w-24 h-12 bg-transparent text-white outline outline-1 hover:bg-white hover:text-dark'
                                label='Clear'
                                callBack={handleFormReset}
                            />
                            <Button
                                className='w-24 bg-green-500 hover:bg-green-400'
                                label='Save'
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
