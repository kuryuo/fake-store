import {useGetAllProductsQuery} from "../store/productsApi.ts";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function ProductList() {
    const {data, isLoading, error} = useGetAllProductsQuery();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {Array.from({length: 8}).map((_, i) => (
                    <Skeleton key={i} className="h-72 w-full rounded-xl"/>
                ))}
            </div>
        );

    if (error) return <p className="text-center mt-10">Ошибка загрузки данных</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Список продуктов</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((product) => (
                    <Card
                        key={product.id}
                        className="cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <CardHeader className="p-0">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-contain bg-gray-50 rounded-t-xl"
                            />
                        </CardHeader>

                        <CardContent className="p-4">
                            <CardTitle className="truncate">{product.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                                {product.category}
                            </CardDescription>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between px-4 pb-4">
                            <span className="font-semibold">${product.price}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
