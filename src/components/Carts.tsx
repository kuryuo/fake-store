import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useGetAllCartsQuery} from "@/store/cartsApi.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useNavigate} from "react-router-dom";

function Carts() {
    const {data, isLoading, error} = useGetAllCartsQuery();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <div className="flex flex-col gap-4">
                {Array.from({length: 5}).map((_, i) => (
                    <Skeleton key={i} className="w-full h-40 rounded-xl"/>
                ))}
            </div>
        );

    if (error) return <p className="text-center mt-10 text-red-500">Ошибка загрузки данных</p>;

    return (
        <div className="flex flex-col gap-6 -mx-6">
            {data?.map((cart) => {
                const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * 20, 0);

                return (
                    <Card
                        key={cart.id}
                        className="w-screen max-w-[1200px] mx-auto hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-xl border border-gray-200 flex flex-col"
                        onClick={() => navigate(`/cart/${cart.id}`)}
                    >
                        <CardHeader className="bg-gray-50 px-6 py-4">
                            <CardTitle className="text-lg font-semibold">
                                User ID: {cart.userId}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-6 py-4 flex flex-col gap-2">
                            <p className="text-sm text-gray-500">Total items: {totalItems}</p>
                            <p className="text-sm text-gray-500">
                                Products:{" "}
                                {cart.products
                                    .map((item) => `Product ${item.productId} x${item.quantity}`)
                                    .join(", ")}
                            </p>
                        </CardContent>

                        <CardFooter className="px-6 py-4 flex justify-between items-center bg-gray-50">
                            <Button variant="outline" size="sm">
                                View Cart
                            </Button>
                            <span className="text-sm font-semibold text-gray-800">
                                ${totalPrice}
                            </span>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

export default Carts;
