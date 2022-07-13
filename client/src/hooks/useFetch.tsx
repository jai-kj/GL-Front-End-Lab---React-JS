import {useCallback, useEffect, useState} from "react"
import axios, {AxiosRequestConfig} from 'axios'

axios.defaults.baseURL = `http://localhost:5000`

const useFetch = (params: AxiosRequestConfig) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>()
    const [data, setData] = useState<any>([])

    const fetchData = useCallback(async (): Promise<void> => {
        setLoading(true)
        try {
            const res = await axios.request(params)
            setData(res.data)
        } catch (error) {
            axios?.isAxiosError(error) ? setError("Axios Error with Message: " + error.message) :
                setError(error)
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        loading,
        error,
        data
    }
}

export default useFetch