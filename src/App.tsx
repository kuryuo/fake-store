import {Route, Routes} from "react-router-dom";
import './App.css'
import ProductsList from "./components/productsList.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element=<ProductsList/> />
        </Routes>
    )
}

export default App
