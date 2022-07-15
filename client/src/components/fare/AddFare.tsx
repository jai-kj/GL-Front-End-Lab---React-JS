import useModal from "./../../hooks/useModal"
import FareModal from "./../layout/modal/FareModal"
const AddFare = () => {
    const { show, setShow } = useModal()

    return (
        <>
            <FareModal
                modalTitle='Add Fare'
                showModal={show}
                setShowModal={setShow}
            />
            <div className='mt-auto mb-12'>
                <button
                    className='float-right py-2 px-4 rounded-lg cursor-pointer bg-red-600 text-light font-medium hover:bg-red-500'
                    type='button'
                    onClick={() => setShow(true)}
                >
                    Add New Fare
                </button>
            </div>
        </>
    )
}

export default AddFare
