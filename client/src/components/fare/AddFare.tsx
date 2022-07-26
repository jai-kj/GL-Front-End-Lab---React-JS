import { IAddFare } from "../../model/Ifare"
import Button from "../layout/Button"

const AddFare = ({ callBack }: IAddFare) => (
    <div className='mt-6'>
        <Button
            className='text-light bg-red-600 hover:bg-red-500'
            callBack={() => callBack(true)}
            label='Add New Fare'
        />
    </div>
)

export default AddFare
