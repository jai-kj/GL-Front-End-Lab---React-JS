import { IAddFare } from "../../model/Ifare"

import Button from "../layout/Button"
// import FareModal from "./../layout/modal/FareModal"

// import useModal from "./../../hooks/useModal"
// import useFetch from "./../../hooks/useFetch"

const AddFare = ({ callBack }: IAddFare) => {
    // const { show, setShow } = useModal()
    // const { sendRequest: addFareRequest } = useFetch({
    //     method: "POST",
    //     url: "/fares",
    //     params: {},
    //     headers: { "Content-Type": "application/json" },
    // })

    // const { sendRequest: addSharerRequest } = useFetch({
    //     method: "POST",
    //     url: "/sharers",
    //     params: {},
    //     headers: { "Content-Type": "application/json" },
    // })

    // const handleFormSubmit = async (formData: {}, sharerData: []) => {
    //     try {
    //         const data = await addFareRequest(formData)
    //         if (Array.isArray(sharerData) && data?.id)
    //             sharerData.forEach(
    //                 async sharer =>
    //                     await addSharerRequest({
    //                         name: sharer,
    //                         fareId: data?.id,
    //                     })
    //             )

    //         callBack()
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    return (
        <>
            {/* <FareModal
                modalTitle='Add Fare'
                showModal={show}
                setShowModal={setShow}
                callBack={(fareData: {}, sharerData: []) =>
                    handleFormSubmit(fareData, sharerData)
                }
            /> */}
            <div className='mt-auto mb-12'>
                <Button
                    className='float-right text-light bg-red-600 hover:bg-red-500'
                    callBack={() => callBack(true)}
                    label='Add New Fare'
                />
            </div>
        </>
    )
}

export default AddFare
