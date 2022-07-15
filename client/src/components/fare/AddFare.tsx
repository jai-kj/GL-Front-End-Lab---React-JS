import { IAddFare } from "../../model/Ifare"

import Button from "../layout/Button"
import FareModal from "./../layout/modal/FareModal"

import useModal from "./../../hooks/useModal"

const AddFare = ({ callBack }: IAddFare) => {
    const { show, setShow } = useModal()

    return (
        <>
            <FareModal
                modalTitle='Add Fare'
                showModal={show}
                setShowModal={setShow}
                callBack={callBack}
            />
            <div className='mt-auto mb-12'>
                <Button
                    className='float-right text-light bg-red-600 hover:bg-red-500'
                    callBack={() => setShow(true)}
                    label='Add New Fare'
                />
            </div>
        </>
    )
}

export default AddFare
