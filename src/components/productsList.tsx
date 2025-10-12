import {useGetAllProductsQuery} from "../store/api.ts";

function ProductsList() {
    const {data, isLoading, error} = useGetAllProductsQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;
    
    return (
        <div>
            <h1>Список продуктов</h1>
            <ul>
                {data?.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title}/>
                        <h2>{product.title}</h2>
                        <p>Цена: ${product.price}</p>
                        <p>{product.description}</p>
                        <p>Категория: {product.category}</p>
                        <p>Рейтинг: {product.rating?.rate} ({product.rating?.count} отзывов)</p>
                        <button>Редактировать</button>
                        <button>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsList;