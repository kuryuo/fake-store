import {useGetAllProductsQuery} from "../store/api.ts";
import {useNavigate} from "react-router-dom";

function ProductList() {
    const {data, isLoading, error} = useGetAllProductsQuery();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;

    return (
        <div>
            <h1>Список продуктов</h1>
            <ul>
                {data?.map(product => (
                    <li
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <img src={product.image} alt={product.title}/>
                        <h2>{product.title}</h2>
                        <p>Цена: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
