import { Route, Routes } from "react-router-dom";
import PokeList from "./assets/components/PokeList";
import Header from "./assets/components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PokeList />} />
      </Routes>
    </>
  );
}

export default App;
