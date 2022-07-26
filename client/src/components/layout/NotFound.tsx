import HomeButton from "./HomeButton"

const NotFound = () => {
    return (
        <div className='h-full flex flex-col text-red-400 items-center'>
            <h1 className='text-4xl font-bold mt-16 mb-4 text-center'>404 Page Not Found!</h1>
            <HomeButton />
        </div>
    )
}

export default NotFound
