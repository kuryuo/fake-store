import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useGetCartByIdQuery} from "@/store/cartsApi.ts";
import {useParams} from "react-router-dom";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function Cart() {
    const {id} = useParams<{ id: string }>();
    const {data: cart, isLoading, error} = useGetCartByIdQuery(Number(id));

    if (isLoading)
        return (
            <div className="flex justify-center p-10">
                <Skeleton className="w-full max-w-5xl h-[500px] rounded-xl"/>
            </div>
        );

    if (error) return <p className="text-center mt-10 text-red-500">Ошибка загрузки данных</p>;
    if (!cart) return <p className="text-center mt-10">Товар не найден</p>;

    const totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * 20, 0);

    return (
        <div className="flex flex-col gap-6 -mx-6 px-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>

            {cart.products.map((item) => (
                <Card
                    key={item.productId}
                    className="w-screen max-w-[1200px] mx-auto hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-xl flex flex-col justify-between"
                >
                    <CardHeader className="bg-gray-50 px-6 py-4">
                        <CardTitle className="text-lg font-semibold">
                            Product {item.productId}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 py-4 space-y-2">
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-500">
                            Price: ${item.quantity * 20}
                        </p>
                    </CardContent>
                </Card>
            ))}

            <div className="w-screen max-w-[1200px] mx-auto text-right mt-4 px-6">
                <p className="text-xl font-bold text-gray-800">Total: ${totalPrice}</p>
            </div>
        </div>
    );
}

export default Cart;
