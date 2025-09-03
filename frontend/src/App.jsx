import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<Home/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
    </Routes>
    <Footer/>
   
    </>
  )
}
export default App;