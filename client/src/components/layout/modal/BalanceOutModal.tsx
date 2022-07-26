import { useMemo } from "react"

import { IBalancedOut } from "../../../model/IExpense"
import { IBalanceOutModal } from "../../../model/IModal"
import { IParticipant } from "../../../model/IParticipant"

const BalanceOutModal = ({
    showModal,
    setShowModal,
    participantsBalance,
    participantsData,
    getParticipantsIndexes,
}: IBalanceOutModal) => {
    const balanceOutExpenses = useMemo(() => {
        const balances = [...participantsBalance]
        const transfers: IBalancedOut[] = []

        participantsData?.forEach((participant: IParticipant) => {
            const i = getParticipantsIndexes[participant?.id]
            if (balances[i] >= 0) return

            participantsData?.forEach((innerParticipant: IParticipant) => {
                const j = getParticipantsIndexes[innerParticipant?.id]
                if (i === j || balances[i] === 0 || balances[j] <= 0) return

                // Calculate transaction
                const toReduce = Math.min(balances[j], balances[i] * -1)
                // Payer => Reduce transaction from outstanding
                balances[i] = Math.round((balances[i] + toReduce) * 100) / 100
                // Receiver => Add transaction to outstanding
                balances[j] = Math.round((balances[j] - toReduce) * 100) / 100

                transfers.push({
                    paidBy: participant?.name,
                    receivedBy: innerParticipant?.name,
                    amount: toReduce,
                })
            })
        })
        return transfers
    }, [participantsData, participantsBalance, getParticipantsIndexes])

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
                        Balance Out
                        <span
                            className='float-right px-1 cursor-pointer text-red-400 font-bold text-2xl hover:scale-110'
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                    </h3>
                </div>
                <div className='modal-body my-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 pt-2'>
                        {balanceOutExpenses?.length ? (
                            balanceOutExpenses?.map(
                                (transction: IBalancedOut, index: number) => (
                                    <div
                                        key={index}
                                        className='bg-dark rounded-md'
                                    >
                                        <p className='px-2 py-3'>
                                            <span className='text-red-300'>
                                                {transction?.paidBy}
                                            </span>
                                            <span className='mx-2'>owes</span>
                                            <span className='text-blue-300'>
                                                {transction?.receivedBy}
                                            </span>
                                        </p>
                                        <p className='bg-[#333333] rounded-b-md px-2 py-1'>
                                            <span className="text-stone-400">Amount : </span>
                                            <span className="font-medium">₹ {transction?.amount?.toFixed(2)}</span>
                                        </p>
                                    </div>
                                )
                            )
                        ) : (
                            <p>No Expenses Found to Balance Out!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceOutModal
