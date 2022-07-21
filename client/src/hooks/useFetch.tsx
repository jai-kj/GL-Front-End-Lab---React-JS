import { useCallback, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { IResponse } from "../model/IRequest"

axios.defaults.baseURL = `http://localhost:5000`

const useFetch = (params: AxiosRequestConfig) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>()
    const [data, setData] = useState<any>([])

    const fetchData = useCallback(
        async (bodyData?: {}, updatedURL?: ""): Promise<IResponse> => {
            setLoading(true)
            let result = {}
            try {
                const res = await axios.request({
                    ...params,
                    data: bodyData,
                    url: updatedURL ?? params?.url,
                })
                setData(res.data)
                result = { ...res.data }
                return result
            } catch (error) {
                axios?.isAxiosError(error)
                    ? setError("Axios Error with Message: " + error.message)
                    : setError(error)
                result = {
                    message: axios?.isAxiosError(error)
                        ? error.message ?? "Server Error"
                        : error,
                }
                return result
            } finally {
                setLoading(false)
            }
        },
        [params]
    )

    return {
        loading,
        error,
        data,
        sendRequest: fetchData,
    }
}

export default useFetch
