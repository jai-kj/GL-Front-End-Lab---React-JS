import Header from "./components/layout/Header"
import FareList from "./components/fare/FareList"

const App = () => {
  return (
    <div className="app w-screen h-screen bg-dark">
      <div className="container mx-auto px-4 lg:px-12">
        <Header />
        <FareList />
      </div>
    </div>
  );
}

export default App;
