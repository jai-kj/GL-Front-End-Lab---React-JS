import { ExpenseSplitList, DropdownSelected } from "../../model/IDropdown"

const ExpenseSplitBetween = ({
    list,
    id,
    label,
    checkedList,
    setCheckList,
}: ExpenseSplitList) => {

    return (
        <div className='flex flex-col w-full mt-6'>
            <label htmlFor={id} className='p-2'>
                {label}
            </label>
            <div className='flex flex-col  sm:flex-row bg-dark rounded-md p-2 sm:flex-wrap'>
                {list?.map((listItem: DropdownSelected, i: number) => (
                    <div
                        className='w-fit px-4 py-2 flex items-center'
                        key={listItem.value}
                    >
                        <input
                            type='checkbox'
                            value={listItem.value}
                            checked={checkedList[i]}
                            onChange={() => setCheckList(i)}
                            placeholder='check-box'
                            className='mr-2 w-5 h-5 cursor-pointer'
                        />
                        <span className='text-lg'>{listItem.option}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExpenseSplitBetween
