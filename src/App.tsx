import {Route, Routes} from "react-router-dom";
import './App.css'
import ProductList from "./components/ProductList.tsx";
import ProductCard from "./components/ProductCard.tsx";
import CreateProduct from "./components/CreateProduct.tsx";
import EditProduct from "./components/EditProduct.tsx";
import Cart from "@/components/Cart.tsx";
import Carts from "@/components/Carts.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/product/:id" element={<ProductCard/>}/>
            <Route path="/create" element={<CreateProduct/>}/>
            <Route path="/edit/:id" element={<EditProduct/>}/>
            <Route path="/cart/:id" element={<Cart/>}/>
            <Route path="/carts" element={<Carts/>}/>
        </Routes>
    )
}

export default App
