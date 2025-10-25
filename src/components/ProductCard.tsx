import {useGetProductByIdQuery} from "../store/productsApi.ts";
import {Link, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

function ProductCard() {
    const {id} = useParams<{ id: string }>();
    const {data: product, isLoading, error} = useGetProductByIdQuery(Number(id));

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
        <div>
            <img src={product.image} alt={product.title}/>
            <h2>{product.title}</h2>
            <p>Цена: ${product.price}</p>
            <p>{product.description}</p>
            <p>Категория: {product.category}</p>
            <p>
                Рейтинг: {product.rating?.rate} ({product.rating?.count} отзывов)
            </p>

            <Link to={`/edit/${product.id}`}>
                <Button>Click me</Button>
            </Link>
        </div>
    );
}

export default ProductCard;