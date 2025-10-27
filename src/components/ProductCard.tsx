import {useGetProductByIdQuery} from "../store/productsApi.ts";
import {Link, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ArrowLeft} from "lucide-react";

function ProductPage() {
    const {id} = useParams<{ id: string }>();
    const {data: product, isLoading, error} = useGetProductByIdQuery(Number(id));

    if (isLoading)
        return (
            <div className="flex justify-center p-10">
                <Skeleton className="w-full max-w-5xl h-[500px] rounded-xl"/>
            </div>
        );

    if (error) return <p className="text-center mt-10">Ошибка загрузки данных</p>;
    if (!product) return <p className="text-center mt-10">Товар не найден</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-1"/> Назад
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[500px] object-contain"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold mb-3">{product.title}</h1>
                        <p className="text-muted-foreground text-base mb-6">
                            {product.category}
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-primary">
                                ${product.price}
                            </p>
                            {product.rating && (
                                <p className="text-sm text-muted-foreground">
                                    Рейтинг: {product.rating.rate} ⭐ ({product.rating.count} отзывов)
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-10">
                        <Button size="lg">Добавить в корзину</Button>
                        <Link to={`/edit/${product.id}`}>
                            <Button size="lg" variant="secondary">
                                Редактировать
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
