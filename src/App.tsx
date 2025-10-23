import {Route, Routes} from "react-router-dom";
import './App.css'
import ProductList from "./components/ProductList.tsx";
import ProductCard from "./components/ProductCard.tsx";
import CreateProduct from "./components/CreateProduct.tsx";
import EditProduct from "./components/EditProduct.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/product/:id" element={<ProductCard/>}/>
            <Route path="/create" element={<CreateProduct/>}/>
            <Route path="/edit/:id" element={<EditProduct/>}/>
        </Routes>
    )
}

export default App
