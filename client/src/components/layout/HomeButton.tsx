import { Link } from "react-router-dom"
import Button from "./Button"

const HomeButton = () => {
    return (
        <Link to='/'>
            <Button
                className='text-xs sm:text-sm outline outline-1 bg:transparent text-white hover:bg-white hover:text-dark py-1 ml-0.5'
                height='8'
                label='&#8592; Home'
            />
        </Link>
    )
}

export default HomeButton
