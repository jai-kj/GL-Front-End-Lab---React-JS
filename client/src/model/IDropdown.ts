export interface DropdownSelected {
    option: string
    value: string
}

export interface DropdownList {
    list: DropdownSelected[]
    id: string
    label: string
}

export interface IDropdown extends DropdownList {
    selected: DropdownSelected
    setSelected: Function
}

export interface ExpenseSplitList extends DropdownList {
    checkedList: any
    setCheckList: Function
}
