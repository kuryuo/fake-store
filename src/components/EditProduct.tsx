import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation} from "../store/api.ts";

function EditProduct() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const {id} = useParams<{ id: string }>();
    const {data: product, isLoading, error} = useGetProductByIdQuery(Number(id));
    const [updateProduct, {isSuccess: isUpdateSuccess}] = useUpdateProductMutation();
    const [deleteProduct, {isSuccess: isDeleteSuccess}] = useDeleteProductMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProduct({id: Number(id), title, price: parseFloat(price), description, category, image});
    };

    const handleDelete = () => {
        deleteProduct(Number(id));
    };

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
        if (isUpdateSuccess) {
            navigate('/');
        }
    }, [isUpdateSuccess, navigate]);

    useEffect(() => {
        if (isDeleteSuccess) {
            navigate('/');
        }
    }, [isDeleteSuccess, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                <input value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)}/>
                <input value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
                <input value={category} placeholder="category" onChange={(e) => setCategory(e.target.value)}/>
                <input value={image} placeholder="image" onChange={(e) => setImage(e.target.value)}/>

                <button type="submit">Сохранить изменения</button>
            </form>
            <button onClick={handleDelete}>Удалить товар</button>
        </div>
    );
}

export default EditProduct;