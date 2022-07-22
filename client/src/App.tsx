import { ContextProvider } from "./context/context"

import Header from "./components/layout/Header"
import FareList from "./components/fare/FareList"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Fare from "./components/fare/Fare"

const App = () => {
    return (
        <ContextProvider>
            <div className='app w-screen h-screen bg-dark'>
                <div className='container h-screen flex flex-col mx-auto px-6 py-4 lg:px-12'>
                    <Header />
                    <Router>
                        <Routes>
                            <Route path='/' element={<FareList />} />
                            <Route path='/fare/:fareId' element={<Fare />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </ContextProvider>
    )
}

export default App
