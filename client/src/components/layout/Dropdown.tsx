import React, { useCallback, useState } from "react"
import { DropdownSelected, IDropdown } from "../../model/IDropdown"
import useOutsideClickHandler from './../../hooks/useOutsideClickHandler'

const defaultOption = {
    option: "Select",
    value: "",
}

const Dropdown = ({ id, label, selected, setSelected, list }: IDropdown) => {
    const [show, setShow] = useState(false)

    const { ref } = useOutsideClickHandler(() => setShow(false))

    const handleSelect = useCallback(
        (selectedChoice: DropdownSelected) => {
            setSelected(selectedChoice)
            setShow(false)
        },
        [setSelected]
    )

    return (
        <div className='form-control flex flex-col w-full'>
            <label htmlFor={id} className='p-2'>
                {label}
            </label>
            <div className='dropdown relative' ref={ref}>
                <div
                    className={`cursor-pointer h-12 bg-dark ${show ? "rounded-t-md" : "rounded-md"
                        } flex items-center px-3 ${!selected.value ? "text-stone-400" : "text-white"
                        }`}
                    onClick={() => setShow(!show)}
                >
                    {!selected.value ? defaultOption.option : selected.option}
                    <span
                        className={`float-right font-bold text-xxs ml-auto rotate-${show ? "180" : "0"
                            } mt-0.5 transition-all duration-300`}
                    >
                        <i className='fas fa-caret-down' />
                    </span>
                </div>
                {show ? (
                    <ul className='absolute top w-full bg-dark rounded-b-md cursor-pointer shadow-sm shadow-stone-600 z-10 max-h-40 overflow-y-auto'>
                        {defaultOption.value !== selected?.value ? (
                            <li
                                className={`px-3 py-2 last:rounded-b-md hover:bg-stone-600`}
                                onClick={() => handleSelect(defaultOption)}
                            >
                                {defaultOption.option}
                            </li>
                        ) : (
                            <></>
                        )}
                        {list.map((listItem: DropdownSelected, i: number) =>
                            `${listItem?.value}` !== (selected?.value) ? (
                                <li
                                    key={i}
                                    className={`px-3 py-2 last:rounded-b-md hover:bg-stone-600`}
                                    onClick={() => handleSelect(listItem)}
                                >
                                    {listItem?.option}
                                </li>
                            ) : (
                                <React.Fragment key={i}></React.Fragment>
                            )
                        )}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Dropdown
