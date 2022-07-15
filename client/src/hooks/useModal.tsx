import {useState} from 'react'

const useModal = () => {
    const [show, setShow] = useState<boolean>(false)

    return {
        show,
        setShow,
    }
}

export default useModal