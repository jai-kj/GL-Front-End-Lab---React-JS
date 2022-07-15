import Header from "./components/layout/Header"
import FareList from "./components/fare/FareList"
import AddFare from "./components/fare/AddFare"

const App = () => {
  return (
    <div className="app w-screen h-screen bg-dark">
      <div className="container h-screen flex flex-col mx-auto p-4 lg:px-12">
        <Header />
        <FareList />
        <AddFare />
      </div>
    </div>
  )
}

export default App
