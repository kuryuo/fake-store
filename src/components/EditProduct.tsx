import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation,} from "../store/productsApi.ts";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ArrowLeft} from "lucide-react";

function EditProductPage() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {data: product, isLoading, error} = useGetProductByIdQuery(Number(id));
    const [updateProduct, {isSuccess: isUpdateSuccess}] = useUpdateProductMutation();
    const [deleteProduct, {isSuccess: isDeleteSuccess}] = useDeleteProductMutation();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price.toString());
            setDescription(product.description);
            setCategory(product.category);
            setImage(product.image);
        }
    }, [product]);

    useEffect(() => {
        if (isUpdateSuccess || isDeleteSuccess) {
            navigate("/");
        }
    }, [isUpdateSuccess, isDeleteSuccess, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProduct({
            id: Number(id),
            title,
            price: parseFloat(price),
            description,
            category,
            image,
        });
    };

    const handleDelete = () => {
        deleteProduct(Number(id));
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10">Ошибка загрузки данных</p>;
    if (!product) return <p className="text-center mt-10">Товар не найден</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Навигация назад */}
            <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-1"/> Назад
            </Link>

            <h1 className="text-3xl font-bold mb-8">Редактировать товар</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Левая колонка: превью изображения */}
                <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="max-h-[400px] object-contain rounded-md"
                        />
                    ) : (
                        <div className="text-gray-400">Нет изображения</div>
                    )}
                </div>

                {/* Правая колонка: форма */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="title">Название</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="price">Цена</Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="description">Описание</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="category">Категория</Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="image">URL изображения</Label>
                        <Input id="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button type="submit" size="lg">
                            Сохранить
                        </Button>
                        <Button type="button" size="lg" variant="destructive" onClick={handleDelete}>
                            Удалить товар
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductPage;
