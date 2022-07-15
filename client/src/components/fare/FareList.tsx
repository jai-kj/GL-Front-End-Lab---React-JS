import useFetch from "../../hooks/useFetch"
import FareItem from './FateItem'
import {Ifare} from './../../model/Ifare'

const FareList = () => {
  const {loading, data, error} = useFetch({
    method: "GET",
    url: "/fares"
  })

  return (
    <table className="my-12 text-light table-auto w-full max-h-96">
      <thead className="text-xl border-b-2 border-light">
        <tr>
          <th className="w-7/12 text-left p-4">Name</th>
          <th className="w-3/12 text-right p-4">Date</th>
          <th className="w-2/12" />
        </tr>
      </thead>
      <tbody>
        {(loading || error || !data?.length) && <tr><td colSpan={3} className="p-4">{loading ? "Loading ..." : error ? error : !data?.length ? 'No Fares Found!' : ""}
        </td></tr>}
        {!loading && data && data?.map((row: Ifare) => <FareItem fare={row} key={row?.id} />)}
      </tbody>
    </table>
  )
}

export default FareList