import { ContextProvider } from "./context/context"

import Header from "./components/layout/Header"
import FareList from "./components/fare/FareList"

const App = () => {
    return (
        <ContextProvider>
            <div className='app w-screen h-screen bg-dark'>
                <div className='container h-screen flex flex-col mx-auto p-4 lg:px-12'>
                    <Header />
                    <FareList />
                </div>
            </div>
        </ContextProvider>
    )
}

export default App
