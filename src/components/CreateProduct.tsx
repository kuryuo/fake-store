import {useEffect, useState} from 'react';
import {useAddNewProductMutation} from "../store/api.ts";
import {useNavigate} from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate();

    const [addProduct, {isSuccess}] = useAddNewProductMutation();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProduct({title, price: parseFloat(price), description, category, image});
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                <input value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)}/>
                <input value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
                <input value={category} placeholder="category" onChange={(e) => setCategory(e.target.value)}/>
                <input value={image} placeholder="image" onChange={(e) => setImage(e.target.value)}/>

                <button type="submit">добавить товар</button>
            </form>
        </div>
    );
}

export default CreateProduct;