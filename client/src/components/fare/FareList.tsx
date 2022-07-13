import useFetch from "../../hooks/useFetch"

const FareList = () => {
  const { loading, data, error } = useFetch("/fares")
  
  return (
    <div>FareList</div>
  )
}

export default FareList