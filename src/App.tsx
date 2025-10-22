import {Route, Routes} from "react-router-dom";
import './App.css'
import ProductList from "./components/ProductList.tsx";
import ProductCard from "./components/ProductCard.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/product/:id" element={<ProductCard/>}/>
        </Routes>
    )
}

export default App
