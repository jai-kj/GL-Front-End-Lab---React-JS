import { useCallback, useEffect, useState } from "react"
import axios from 'axios'

const baseURL = `http://localhost:5000`

const useFetch = (url: string) => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ data, setData ] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseURL}${url}`);
            setData(res?.data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setError(error)
        }
    }, [ url ])

    useEffect(() => {
        fetchData()
    }, [ fetchData ])

    return {
        loading,
        error,
        data
    }
}

export default useFetch