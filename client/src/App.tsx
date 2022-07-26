import { ContextProvider } from "./context/context"

import Header from "./components/layout/Header"
import FareList from "./components/fare/FareList"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Fare from "./components/fare/Fare"

const App = () => {
    return (
        <ContextProvider>
            <div className='app w-screen h-screen bg-dark'>
                <div className='container h-full flex flex-col mx-auto px-6 lg:px-12 overflow-y-hidden'>
                    <Header />
                    <div className="app-container h-[calc(100%_-_7.5rem)]">
                        <Router>
                            <Routes>
                                <Route path='/' element={<FareList />} />
                                <Route path='/fare/:fareId' element={<Fare />} />
                            </Routes>
                        </Router>
                    </div>
                </div>
            </div>
        </ContextProvider>
    )
}

export default App
